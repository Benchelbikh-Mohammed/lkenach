import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductService } from 'src/product/product.service';
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

        const { products } = await this.findOne(id);
        return this.update(id, {
            products: [...products, { ...product, product_id: p._id }],
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
        this.model.findByIdAndUpdate(id, updateStoreDto).exec();
        return this.findOne(id);
    }

    remove(id: number) {
        return `This action removes a #${id} store`;
    }
}
