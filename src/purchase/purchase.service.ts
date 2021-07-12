import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { salesDocument } from 'src/sales/entities/sale.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { purchase } from './entities/purchase.entity';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectModel(purchase.name)
        private readonly model: Model<salesDocument>,
    ) {}

    create(createPurchaseDto: CreatePurchaseDto) {
        return new this.model(createPurchaseDto).save();
    }

    findAll() {
        return this.model.find().exec();
    }

    findBystore(store_id: string) {
        return this.model.find({ store_id }).exec();
    }

    findOne(id: string) {
        return this.model.findById(id).exec();
    }

    update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
        return this.model.findByIdAndUpdate(id, updatePurchaseDto).exec();
    }

    remove(id: number) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
