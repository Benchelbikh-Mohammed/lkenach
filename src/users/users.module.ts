import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        RolesModule,
        forwardRef(() => AuthModule),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
