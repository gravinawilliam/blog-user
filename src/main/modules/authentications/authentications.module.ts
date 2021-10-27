import { Module } from '@nestjs/common';

import { AuthenticateUserController } from '@application/controllers/authentications/authenticate-user.controller';

import { AuthenticateUserRoute } from './routes/authenticate-user.route';

@Module({
  controllers: [AuthenticateUserRoute],
  providers: [AuthenticateUserController],
})
export class AuthenticationsModule {}
