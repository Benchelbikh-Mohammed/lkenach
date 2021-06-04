import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * UserRegistrationDto
 */
export class UserRegistrationDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(4, { message: 'password must a least contains 4 characters' })
    password: string;

    @IsNotEmpty()
    @MinLength(4, { message: 'password must a least contains 4 characters' })
    confirmPassword: string;
}
