import { UserModel } from '@models/user.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace SendForgotPasswordValidatorDTO {
  export type Params = {
    email: string;
  };

  export type Result = Either<
    IHttpResponse,
    {
      user: UserModel;
    }
  >;
}

export namespace SendForgotPasswordUseCaseDTO {
  export type Params = {
    user: UserModel;
  };

  export type Result = void;
}
