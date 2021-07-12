import { Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import * as crypto from 'crypto';
import { RolesService } from '../roles/roles.service';
import { RoleCode } from '../roles/entities/roleCode.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/roles/entities/role.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly roleService: RolesService,
        @InjectModel(User.name)
        private readonly model: Model<UserDocument>,
        private readonly storeService: StoreService,
    ) {}

    async findAll() {
        try {
            return this.model.find();
        } catch (error) {
            Logger.error(error);
        }
    }

    async getRoles() {
        try {
            return await this.roleService.findAll();
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }
    async getRole(id: Role) {
        try {
            return await this.roleService.findById(id);
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async find(email: string, password: string): Promise<User> {
        try {
            const encryptedPass = this.encryptPassword(password);
            return await this.model
                .findOne({ email, password: encryptedPass })
                .exec();
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async findEmail(email: string): Promise<User> {
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
                RoleCode.ADMIN,
            );

            user.roles.push(userRole);
            // console.log(user);
            return await this.save(user);
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    async getStore(id) {
        return await this.storeService.findStoreByUserId(id);
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

    async update(id: string, updateUserDto: UpdateUserDto) {
        const password = this.encryptPassword(updateUserDto.password);
        return this.model
            .findByIdAndUpdate(id, { ...updateUserDto, password })
            .exec();
    }
}
