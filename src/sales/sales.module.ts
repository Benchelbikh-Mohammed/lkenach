import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SalesSchema } from './entities/sale.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Sale.name, schema: SalesSchema }]),
    ],
    controllers: [SalesController],
    providers: [SalesService],
})
export class SalesModule {}
