import { Module } from '@nestjs/common';
import { salesService } from './sales.service';
import { salesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { sale, salesSchema } from './entities/sale.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: sale.name, schema: salesSchema }]),
    ],
    controllers: [salesController],
    providers: [salesService],
})
export class salesModule {}
