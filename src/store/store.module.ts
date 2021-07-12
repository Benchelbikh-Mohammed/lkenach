import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './entities/store.entity';
import { ProductModule } from 'src/product/product.module';
import { PurchaseModule } from 'src/purchase/purchase.module';

@Module({
    imports: [
        PurchaseModule,
        ProductModule,
        MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    ],
    controllers: [StoreController],
    providers: [StoreService],
    exports: [StoreService],
})
export class StoreModule {}
