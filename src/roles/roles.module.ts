import { Module, forwardRef } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role, RoleSchema } from './entities/role.entity';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    ],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule {}
