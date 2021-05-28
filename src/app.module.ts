import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import mongooseConfigAsync from './config/mongoose.config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync(mongooseConfigAsync),
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
