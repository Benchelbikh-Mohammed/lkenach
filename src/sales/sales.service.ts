import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatesaleDto } from './dto/create-sale.dto';
import { UpdatesaleDto } from './dto/update-sale.dto';
import { sale, salesDocument } from './entities/sale.entity';

@Injectable()
export class salesService {
    constructor(
        @InjectModel(sale.name)
        private readonly model: Model<salesDocument>,
    ) {}

    create(createsaleDto: CreatesaleDto) {
        try {
            const created = new this.model(createsaleDto);

            const balence =
                createsaleDto.total_cashed -
                createsaleDto.products
                    .map((product) => product.sale_price * product.qte)
                    .reduce((e, s) => e + s, 0);

            console.log(balence);

            created.balence = balence;

            return created.save();
        } catch (error) {
            Logger.error(error);
        }
    }

    findAll() {
        return this.model.find().exec();
    }

    findByStore(store_id) {
        return this.model.find({ store_id }).exec();
    }

    findOne(id: string) {
        return this.model.findById(id).exec();
    }

    update(id: number, updatesaleDto: UpdatesaleDto) {
        return `This action updates a #${id} sale`;
    }

    remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
