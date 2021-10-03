import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeCreateReviwerController } from '@main/factories/reviwers/create-reviwer.factory';

@Controller('/reviwers')
export class CreateReviwerRoute {
  @Post('/create')
  async create(@Req() request, @Res() response) {
    return adapterRoute(makeCreateReviwerController())(request, response);
  }
}
