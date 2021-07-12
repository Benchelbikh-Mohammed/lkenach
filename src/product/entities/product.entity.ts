import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const required = true;
export type ProductDocument = Document & Product;

@Schema()
export class Product {
    _id?: string;

    @Prop({ required })
    name: string;

    @Prop()
    measurement_unit: Unit;

    @Prop()
    unit_per_product: number;

    @Prop()
    thumbnail: string;

    @Prop({ required })
    code_bar: number;

    @Prop()
    department: string;

    @Prop()
    category: string;

    @Prop()
    brand: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
