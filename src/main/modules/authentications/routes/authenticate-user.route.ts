import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeAuthenticateUserController } from '@main/factories/authetications/authenticate-user.factory';

@Controller('/authentications')
export class AuthenticateUserRoute {
  @Post('/authenticate')
  async create(@Req() request, @Res() response) {
    return adapterRoute(makeAuthenticateUserController())(request, response);
  }
}
