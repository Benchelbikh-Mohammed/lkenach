import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './entities/store.entity';

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(Store.name)
        private readonly model: Model<StoreDocument>,
    ) {}

    create(createStoreDto: CreateStoreDto) {
        try {
            const created = new this.model(createStoreDto);

            return created.save();
        } catch (error) {
            Logger.error(error);
        }
    }

    findAll() {
        return this.model.find().exec();
    }

    findStoreByUserId(user_id) {
        return this.model.find({ user_id }).exec();
    }

    findOne(id: number) {
        return `This action returns a #${id} store`;
    }

    update(id: string, updateStoreDto: UpdateStoreDto) {
        return this.model.findByIdAndUpdate(id, updateStoreDto).exec();
    }

    remove(id: number) {
        return `This action removes a #${id} store`;
    }
}
