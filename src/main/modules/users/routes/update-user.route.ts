import { Controller, Put, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeUpdateUserController } from '@main/factories/users/update-user.factory';

@Controller('/users')
export class UpdateUserRoute {
  @Put('/update')
  update(@Req() request, @Res() response) {
    return adapterRoute(makeUpdateUserController())(request, response);
  }
}
