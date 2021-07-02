import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
    StoreProductInterface,
    StoreProductSchema,
} from 'src/store/entities/store.entity';

export type SalesDocument = Document & Sale;

@Schema()
export class Sale {
    _id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
    store_id: string;

    @Prop()
    client_name: string;

    @Prop()
    transaction_date: Date;

    @Prop()
    total_cashed: number;

    @Prop()
    balence?: number;

    @Prop({ type: [StoreProductSchema], default: [] })
    products: StoreProductInterface[];
}

export const SalesSchema = SchemaFactory.createForClass(Sale);
