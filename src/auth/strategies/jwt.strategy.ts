import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserLoginDto } from '../../users/dto/userLogin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    async validate(payload: UserLoginDto) {
        // console.log(payload);
        const user = await this.authService.validate(payload);

        console.log('jwt strategy', user);
        if (!user) {
            console.log('heeere');
            throw new UnauthorizedException();
        }
        return user;
    }
}
