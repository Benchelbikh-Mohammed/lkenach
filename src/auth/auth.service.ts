import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { ConfigService } from '@nestjs/config';
import { UserRegistrationDto } from '../users/dto/userRegistration.dto';
import { UserLoginDto } from '../users/dto/userLogin.dto';
import { RoleCode } from 'src/roles/entities/roleCode.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly confService: ConfigService,
    ) {}

    public async validate(userLoginDto: UserLoginDto): Promise<User> {
        try {
            return await this.userService.findByEmail(userLoginDto.email);
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    public async login(user: User): Promise<any | { status: number }> {
        console.log(user);
        const roles = user.roles.map((userRole: Role) => userRole?.roleCode);
        const userPayload = {
            email: user.email,
            isActive: user.isActive,
            roles,
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
        if (validate) return null;

        const user: User = {
            email: userRegistrationDto.email,
            password: userRegistrationDto.password,
            isActive: null,
            roles: [],
        };

        return this.userService.create(user);
    }
}
