import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { Public } from './decorators/public.decorator';
import { UserRegistrationDto } from '../users/dto/userRegistration.dto';
import { UserLoginDto } from '../users/dto/userLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() userLoginDto: UserLoginDto): Promise<User> {
        const validatedUser = await this.authService.validateEmailPassword(
            userLoginDto,
        );
        // console.log(validatedUser);s
        if (!validatedUser) {
            throw new HttpException(
                'invalid credentials',
                HttpStatus.NOT_FOUND,
            );
        }
        return this.authService.login(validatedUser);
    }

    @Public()
    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async register(
        @Body() userRegistrationDto: UserRegistrationDto,
    ): Promise<any> {
        if (
            userRegistrationDto.password !== userRegistrationDto.confirmPassword
        ) {
            throw new HttpException(
                'passwords do not match',
                HttpStatus.BAD_REQUEST,
            );
        }
        const userRegistered = await this.authService.register(
            userRegistrationDto,
        );

        if (!userRegistered) {
            throw new HttpException(
                `email already in use[Email=${userRegistrationDto.email}]`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return JSON.parse(JSON.stringify(userRegistered));
    }
}
