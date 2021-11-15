import { UserModel } from '@models/user.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace UpdateUserValidatorDTO {
  export type Params = {
    email?: string;
    currentPassword: string;
    newPassword?: string;
    authorization: string;
  };

  export type Result = {
    currentUser: UserModel;
  };
}

export namespace UpdateUserUseCaseDTO {
  export type Params = {
    currentUser: UserModel;
    name?: string;
    newPassword?: string;
    email?: string;
  };

  export type Result = {
    id: string;
    email: string;
    name: string;
    updatedAt: Date;
  };
}

export namespace UpdateUserTransformerDTO {
  export type Params = {
    newPassword: string;
  };

  export type Result = Either<
    IHttpResponse,
    {
      newEncryptedPassword: string;
    }
  >;
}
