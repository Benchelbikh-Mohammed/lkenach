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
import { StoreModule } from './store/store.module';
import { salesModule } from './sales/sales.module';
import { PurchaseModule } from './purchase/purchase.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        ConfigModule.forRoot(),
        ProductModule,
        MongooseModule.forRootAsync(mongooseConfigAsync),
        AuthModule,
        // JwtModule.registerAsync(jwtConfig),
        UsersModule,
        RolesModule,
        StoreModule,
        salesModule,
        PurchaseModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule { }
