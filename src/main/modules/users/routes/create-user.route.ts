import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeCreateUserController } from '@main/factories/users/create-user.factory';
import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller('/users')
export class CreateUserRoute {
  @Post('/create')
  async create(@Req() request, @Res() response) {
    return adapterRoute(makeCreateUserController())(request, response);
  }
}
