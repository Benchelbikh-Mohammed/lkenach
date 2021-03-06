import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly model: Model<ProductDocument>,
    ) {}

    create(createProductDto: CreateProductDto, thumbnail:String) {
        try {
            const created = new this.model({
                ...createProductDto,
                createdAt: Date.now(),
                thumbnail: thumbnail,
            });

            return created.save();
        } catch (error) {
            return JSON.parse(error); // tries to return the error logged in the console as a json response; not working btw
        }
    }

    findAll() {
        return this.model.find().exec();
    }

    findBycodeBar(code_bar: number): Promise<Product> {
        return this.model.findOne({ code_bar }).exec();
    }

    findOne(id: string) {
        return this.model.findById(id).exec();
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        updateProductDto.updatedAt = Date.now();
        return this.model.findByIdAndUpdate(id, updateProductDto).exec();
    }

    remove(id: string) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
