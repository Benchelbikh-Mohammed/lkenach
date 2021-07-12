import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { ConfigService } from '@nestjs/config';
import { UserRegistrationDto } from '../users/dto/userRegistration.dto';
import { UserLoginDto } from '../users/dto/userLogin.dto';
import { RoleCode } from 'src/roles/entities/roleCode.enum';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly confService: ConfigService,
        private readonly storeService: StoreService,
    ) {}

    public async validate(userLoginDto: UserLoginDto): Promise<User> {
        try {
            const { email } = userLoginDto;
            const user = await this.userService.findEmail(email);

            return (
                user && {
                    _id: user?._id,
                    firstname: user?.firstname,
                    lastname: user?.lastname,
                    email: user?.email,
                    password: user?.password,
                    isActive: user?.isActive,
                    roles: await this.formatRoles(user?.roles),
                }
            );
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async formatRoles(userRoles) {
        let roles = await this.userService.getRoles();
        // console.log(roles);
        roles = roles.filter((role) => userRoles.indexOf(role._id) != -1);
        return roles;
    }

    public async validateEmailPassword(
        userLoginDto: UserLoginDto,
    ): Promise<User> {
        try {
            const { email, password } = userLoginDto;
            console.log('debuug', email, password);
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    public async login(user: User): Promise<any | { status: number }> {
        // console.log(user);

        const userPayload = {
            id: user._id,
            email: user.email,
            isActive: user.isActive,
            roles: await this.formatRoles(user.roles),
            store_ids: await this.storeService.findStoreByUserId(user._id),
        };
        const accessToken = this.jwtService.sign(userPayload);

        return {
            expires_in: this.confService.get('JWT_EXPIRATION_DELAY'),
            access_token: accessToken,
            user: userPayload,
            status: HttpStatus.OK,
        };
    }

    public async register(
        userRegistrationDto: UserRegistrationDto,
    ): Promise<User> {
        const validate = await this.validate(userRegistrationDto);
        console.log('*****************************');
        console.log(validate);
        console.log('*****************************');
        if (validate) return null;

        const user: User = {
            firstname: userRegistrationDto.firstname,
            lastname: userRegistrationDto.lastname,
            email: userRegistrationDto.email,
            password: userRegistrationDto.password,
            isActive: null,
            roles: [],
        };

        return this.userService.create(user);
    }
}
