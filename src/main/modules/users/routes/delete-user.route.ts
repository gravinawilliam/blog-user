import { Controller, Req, Res, Delete } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeDeleteUserController } from '@main/factories/users/delete-user.factory';

@Controller('/users')
export class DeleteUserRoute {
  @Delete('/delete/:user_id')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeDeleteUserController())(request, response);
  }
}
