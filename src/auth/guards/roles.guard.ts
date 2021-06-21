import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../../roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { RoleCode } from '../../roles/entities/roleCode.enum';
/**s
 * Role auth guard to control app's endpoint access with specific roles.
 * This guard needs to be filled on each endpoint which need specifics roles to be used.
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        // console.log(Object.keys(request));
        if (user && !user.isActive) {
            console.log('gotchaa');
            return false;
        }

        const roles = this.reflector.get<RoleCode[]>(
            'roleCodes',
            context.getHandler(),
        );
        // console.log(roles);
        if (!roles) {
            return true;
        }

        return this.hasRole(roles, user && user.roles);
    }

    private hasRole(roles: RoleCode[], userRoles: Role[]) {
        // console.log(roles, userRoles);

        return userRoles.some(
            (userRole) =>
                roles.find((role) => role === userRole.roleCode) != null,
        );
    }
}
