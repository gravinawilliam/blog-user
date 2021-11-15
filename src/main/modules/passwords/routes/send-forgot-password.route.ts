import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeSendForgotPasswordController } from '@main/factories/passwords/send-forgot-password.factory';

@Controller('/passwords')
export class SendForgotPasswordRoute {
  @Post('/send-forgot-password')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeSendForgotPasswordController())(request, response);
  }
}
