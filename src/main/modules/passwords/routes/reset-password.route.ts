import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeResetPasswordController } from '@main/factories/passwords/reset-password.factory';

@Controller('/passwords')
export class ResetPasswordRoute {
  @Post('/reset')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeResetPasswordController())(request, response);
  }
}
