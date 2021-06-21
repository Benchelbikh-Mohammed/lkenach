import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './entities/role.entity';
import { RoleCode } from './entities/roleCode.enum';

/**
 * Roles service
 */
@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private readonly model: Model<RoleDocument>,
    ) {}

    async findAll(): Promise<Role[]> {
        try {
            return await this.model.find().exec();
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async findById(id) {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async findByRoleCode(roleCode: RoleCode): Promise<Role> {
        try {
            const role = await this.model.findOne({ roleCode }).exec();

            return role;
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }
}
