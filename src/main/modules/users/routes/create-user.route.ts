import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeCreateUserController } from '@main/factories/users/create-user.factory';

@Controller('/users')
export class CreateUserRoute {
  @Post('/create')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(@Req() request, @Res() response) {
    return adapterRoute(makeCreateUserController())(request, response);
  }
}
