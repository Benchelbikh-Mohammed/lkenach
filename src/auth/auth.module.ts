import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AppAuthGuard } from './guards/appAuth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AuthController } from './auth.controller';
import { jwtConfig } from 'src/config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';

@Module({
    imports: [
        ConfigModule,
        forwardRef(() => UsersModule),
        forwardRef(() => RolesModule),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) =>
                ({
                    secret: configService.get('JWT_SECRET_KEY'),
                    expiresIn: configService.get('JWT_EXPIRATION_DELAY'),
                } as any),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AppAuthGuard,
        },
        AuthService,
        ConfigService,
        JwtStrategy,
        AppAuthGuard,
        RolesGuard,
    ],
    exports: [JwtModule],
})
export class AuthModule {}
