import { Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import * as crypto from 'crypto';
import { RolesService } from '../roles/roles.service';
import { RoleCode } from '../roles/entities/roleCode.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        private readonly roleService: RolesService,
        @InjectModel(User.name)
        private readonly model: Model<UserDocument>,
    ) {}

    async findByEmail(email: string): Promise<User> {
        try {
            return await this.model.findOne({ email }).exec();
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async findById(id: number): Promise<User> {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async create(user: User): Promise<User> {
        user.password = this.encryptPassword(user.password);
        user.isActive = false;
        try {
            const userRole = await this.roleService.findByRoleCode(
                RoleCode.USER,
            );

            user.roles.push(userRole);
            console.log(user);
            return await this.save(user);
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async save(user: User): Promise<User> {
        try {
            return await new this.model(user).save();
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    encryptPassword(password: string): string {
        return crypto.createHmac('sha256', password).digest('hex');
    }
}
