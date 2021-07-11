import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/roles/entities/role.entity';
import { Store } from 'src/store/entities/store.entity';

export type UserDocument = Document & User;

@Schema()
export class User {
    _id?: string;
    @Prop()
    email: string;

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    password: string;

    @Prop()
    isActive: boolean;

    @Prop()
    phone_number?: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }] })
    stores?: Store[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
