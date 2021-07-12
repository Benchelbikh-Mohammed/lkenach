import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { purchase, purchaseSchema } from './entities/purchase.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: purchase.name, schema: purchaseSchema },
        ]),
    ],
    controllers: [PurchaseController],
    providers: [PurchaseService],
    exports: [PurchaseService],
})
export class PurchaseModule {}
