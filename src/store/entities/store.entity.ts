import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { classToClass } from 'class-transformer';

export type StoreDocument = Document & Store;

export interface StoreProductInterface {
    product_id?: string;
    code_bar: number;
    qte: number;
    sale_price: number;
    purchase_price?: number;
}

@Schema()
export class StoreProduct {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product_id: string;

    @Prop({ required: true })
    code_bar: number;

    @Prop()
    qte: number;

    @Prop()
    sale_price: number;

    @Prop()
    purchase_price: number;
}

@Schema()
class UnionClass {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product_id: string;

    @Prop({ required: true })
    code_bar: number;

    @Prop()
    qte: number;

    @Prop()
    sale_price: number;

    @Prop()
    purchase_price: number;

    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    measurement_unit: Unit;

    @Prop()
    unit_per_product: number;

    @Prop()
    thumbnail: string;

    @Prop()
    department: string;

    @Prop()
    category: string;

    @Prop()
    brand: string;
}

export const UnionSchema = SchemaFactory.createForClass(UnionClass);

export const StoreProductSchema = SchemaFactory.createForClass(StoreProduct);

@Schema()
export class Store {
    _id: string;

    @Prop()
    store_name: string;

    @Prop()
    type: string;

    @Prop({ default: 0 })
    cash: number;

    @Prop()
    description: string;

    @Prop()
    adresse: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: string;

    @Prop({ type: [UnionSchema], default: [] })
    products: Array<StoreProduct & Product>;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
