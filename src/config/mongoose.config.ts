import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    MongooseModuleAsyncOptions,
    MongooseModuleOptions,
} from '@nestjs/mongoose';

class MongooseConfig {
    static getMongooseConfig(config: ConfigService): MongooseModuleOptions {
        return {
            uri: config.get('DB_URI'),
        };
    }
}

const mongooseConfigAsync: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) =>
        MongooseConfig.getMongooseConfig(config),
    inject: [ConfigService],
};

export default mongooseConfigAsync;
