import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/roles/entities/role.entity';
import { RoleCode } from 'src/roles/entities/roleCode.enum';

export type UserDocument = Document & User;

@Schema()
export class User {
    _id?: string;
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    isActive: boolean;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    roles: RoleCode[];
}

export const UserSchema = SchemaFactory.createForClass(User);
