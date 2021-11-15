import { UserModel } from '@models/user.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace ResetPasswordValidatorDTO {
  export type Params = {
    email: string;
    newPassword: string;
    token: string;
  };

  export type Result = Either<
    IHttpResponse,
    {
      user: UserModel;
    }
  >;
}

export namespace ResetPasswordUseCaseDTO {
  export type Params = {
    user: UserModel;
    passwordEncrypted: string;
  };

  export type Result = void;
}

export namespace ResetPasswordTransformerDTO {
  export type Params = {
    newPassword: string;
  };

  export type Result = {
    passwordEncrypted: string;
  };
}
