import { Module } from '@nestjs/common';

import { CreateUserController } from '@application/controllers/users/create-user.controller';
import { DeleteUserController } from '@application/controllers/users/delete-user.controller';

import { CreateUserRoute } from './routes/create-user.route';
import { DeleteUserRoute } from './routes/delete-user.route';
import { UpdateUserRoute } from './routes/update-user.route';

@Module({
  controllers: [CreateUserRoute, DeleteUserRoute, UpdateUserRoute],
  providers: [CreateUserController, DeleteUserController],
})
export class CreateUserModule {}
