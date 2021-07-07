import {
    Controller,
    Body,
    Post,
    Param,
    HttpException,
    HttpStatus,
    UseGuards,
    Get,
    Query,
    Logger,
    Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleCode } from '../roles/entities/roleCode.enum';
import { UsersRolesDto } from './dto/usersRoles.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post(':userId/roles')
    @UseGuards(RolesGuard)
    @Roles(RoleCode.ADMIN)
    async setUsersRole(
        @Param('userId') userId: number,
        @Body() usersRolesDto: UsersRolesDto,
    ): Promise<User> {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new HttpException(
                `User [ID=${userId}] not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        user.roles = await this.formatRoles(usersRolesDto.roles);
        const updatedUser = await this.usersService.save(user);
        if (!updatedUser) {
            throw new HttpException(
                `Error while updating User [ID=${userId}]`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return updatedUser;
    }
    @Public()
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    async formatRoles(usersRoles) {
        const roles = await this.usersService.getRoles();

        return roles.filter(
            (r) =>
                usersRoles.find((userRole, i) => {
                    console.log(userRole == r._id || userRole == r.roleCode);
                    return userRole == r._id || userRole == r.roleCode;
                }) != null,
        );
    }

    @Get(':userId/activation')
    @UseGuards(RolesGuard)
    @Roles(RoleCode.ADMIN)
    async setActivation(
        @Param('userId') userId: number,
        @Query('active') active: string,
    ): Promise<User> {
        if (!active || (active !== 'true' && active !== 'false')) {
            throw new HttpException(
                `The active query param must be set to \'true\' or \'false\'`,
                HttpStatus.BAD_REQUEST,
            );
        }
        const isActive = active === 'true';

        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new HttpException(
                `User [ID=${userId}] not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        console.log(user);

        user.isActive = isActive;

        console.log(user.roles);
        console.log(await this.formatRoles(user.roles));
        console.log(user.roles);

        const updatedUser = await this.usersService.save(user);
        if (!updatedUser) {
            throw new HttpException(
                `Error while updating User [ID=${userId}]`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return updatedUser;
    }

    @Public()
    @Get(':userId')
    async getUSer(@Param('userId') userId: number): Promise<User> {
        try {
            return await this.usersService.findById(userId);
        } catch (error) {
            Logger.error(error);
        }
    }

    @Public()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        console.log('patch');
        return this.usersService.update(id, updateUserDto);
    }
}
