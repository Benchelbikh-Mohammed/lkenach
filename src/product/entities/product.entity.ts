import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const required = true;
export type ProductDocument = Document & Product;

@Schema()
export class Product {
    @Prop({ required })
    department: string;

    @Prop({ required })
    category: string;

    @Prop({ required })
    brand: string;

    @Prop({ required })
    thumbnail: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
