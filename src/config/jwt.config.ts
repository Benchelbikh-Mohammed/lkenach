import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfig = {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) =>
        ({
            expiresIn: config.get('JWT_EXPIRATION_DELAY'),
            secret: config.get('JWT_SECRET_KEY'),
        } as any),
    inject: [ConfigService],
};
