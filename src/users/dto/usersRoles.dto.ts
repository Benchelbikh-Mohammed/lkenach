import { ValidateNested } from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';
import { Type } from 'class-transformer';
import { RoleCode } from 'src/roles/entities/roleCode.enum';

export class UsersRolesDto {
    @ValidateNested()
    @Type(() => RoleDto)
    roles: RoleCode[];
}
