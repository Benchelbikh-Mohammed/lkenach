import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleCode } from './roleCode.enum';

export type RoleDocument = Document & Role;

@Schema()
export class Role {
    @Prop()
    roleCode: RoleCode;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
