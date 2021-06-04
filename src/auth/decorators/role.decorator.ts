import { SetMetadata } from '@nestjs/common';
import { RoleCode } from '../../roles/entities/roleCode.enum';

export const Roles = (...roleCodes: RoleCode[]) =>
    SetMetadata('roleCodes', roleCodes);
