import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale, SalesDocument } from './entities/sale.entity';

@Injectable()
export class SalesService {
    constructor(
        @InjectModel(Sale.name)
        private readonly model: Model<SalesDocument>,
    ) {}

    create(createSaleDto: CreateSaleDto) {
        try {
            const created = new this.model(createSaleDto);

            const balence =
                createSaleDto.total_cashed -
                createSaleDto.products
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

    findOne(id: number) {
        return `This action returns a #${id} sale`;
    }

    update(id: number, updateSaleDto: UpdateSaleDto) {
        return `This action updates a #${id} sale`;
    }

    remove(id: number) {
        return `This action removes a #${id} sale`;
    }
}
