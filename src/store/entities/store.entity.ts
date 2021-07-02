import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StoreDocument = Document & Store;

export interface StoreProductInterface {
    product_id: string;
    qte: number;
    purchase_price: number;
    sale_price: number;
}

@Schema()
export class StoreProduct {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product_id: string;

    @Prop()
    qte: number;

    @Prop()
    purchase_price: number;

    @Prop()
    sale_price: number;
}

export const StoreProductSchema = SchemaFactory.createForClass(StoreProduct);

@Schema()
export class Store {
    _id: string;

    @Prop()
    store_name: string;

    @Prop()
    type: string;

    @Prop()
    description: string;

    @Prop()
    adresse: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: string;

    @Prop({ type: [StoreProductSchema], default: [] })
    products: StoreProductInterface[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
