import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type purchaseDocument = Document & purchase;

@Schema()
export class purchase {
    _id?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
    store_id: string;

    @Prop()
    product_name: string;

    @Prop()
    qte: number;

    @Prop()
    unit_price: number;

    @Prop()
    transaction_date: Date;
}

export const purchaseSchema = SchemaFactory.createForClass(purchase);
