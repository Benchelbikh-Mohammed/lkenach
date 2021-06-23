import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const required = true;
export type ProductDocument = Document & Product;

@Schema()
export class Product {
    _id: string;

    @Prop({required})
    name: string;

    @Prop({ required })
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
