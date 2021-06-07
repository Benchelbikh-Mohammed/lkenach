import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import mongooseConfigAsync from './config/mongoose.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { jwtConfig } from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync(mongooseConfigAsync),
        AuthModule,
        JwtModule.registerAsync(jwtConfig),
        ProductModule,
        UsersModule,
        RolesModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {}