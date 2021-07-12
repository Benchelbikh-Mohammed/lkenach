import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { PurchaseService } from 'src/purchase/purchase.service';
import { AddProduct2StoreDto } from './dto/add-product-store.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './entities/store.entity';

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(Store.name)
        private readonly model: Model<StoreDocument>,
        private readonly productService: ProductService,
        private readonly purchaseService: PurchaseService,
    ) {}

    create(createStoreDto: CreateStoreDto) {
        try {
            const created = new this.model(createStoreDto);

            return created.save();
        } catch (error) {
            Logger.error(error);
        }
    }

    async addProductToStore(
        id: string,
        product: AddProduct2StoreDto & CreateProductDto,
    ) {
        const p = await this.productService.findBycodeBar(product.code_bar);

        if (!p) return;
        delete p._id;

        this.purchaseService.create({
            product_name: product.name,
            qte: product.qte,
            store_id: id,
            transaction_date: new Date(),
            unit_price: product.purchase_price,
        });

        const { products } = await this.findOne(id);
        console.log('debuuuug', { ...p });
        return this.update(id, {
            products: [
                ...products,
                {
                    product_id: p._id,
                    code_bar: p.code_bar,
                    qte: product.qte,
                    purchase_price: product.purchase_price,
                    sale_price: product.sale_price,
                    brand: p.brand,
                    category: p.category,
                    department: p.department,
                    measurement_unit: p.measurement_unit,
                    name: p.name,
                    thumbnail: p.thumbnail,
                    unit_per_product: p.unit_per_product,
                },
            ],
        });
    }

    findAll() {
        return this.model.find().exec();
    }

    findStoreByUserId(user_id) {
        return this.model.find({ user_id }).exec();
    }

    findOne(id: string): Promise<Store> {
        return this.model.findById(id).exec();
    }

    update(id: string, updateStoreDto: UpdateStoreDto) {
        console.log('wooow');
        this.model.findByIdAndUpdate(id, updateStoreDto).exec();
        return this.findOne(id);
    }

    remove(id: number) {
        return `This action removes a #${id} store`;
    }
}
