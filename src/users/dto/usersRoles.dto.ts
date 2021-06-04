import { ValidateNested } from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';
import { Type } from 'class-transformer';

export class UsersRolesDto {
    @ValidateNested()
    @Type(() => RoleDto)
    roles: RoleDto[];
}
