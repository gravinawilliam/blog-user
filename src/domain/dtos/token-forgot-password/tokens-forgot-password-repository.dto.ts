import { TokenForgotPasswordModel } from '@models/token-forgot-password.model';

import { Either } from '@shared/utils/either';

export namespace CreateTokenForgotPasswordRepositoryDTO {
  export type Params = {
    userId: string;
    token: string;
    email: string;
  };

  export type Result = void;
}

export namespace DeleteTokenForgotPasswordRepositoryDTO {
  export type Params = {
    tokenForgotPassword: TokenForgotPasswordModel;
  };

  export type Result = void;
}

export namespace FindByUserIdTokenForgotPasswordRepositoryDTO {
  export type Params = {
    userId: string;
  };

  export type Result = Either<
    undefined,
    {
      tokenForgotPassword: TokenForgotPasswordModel;
    }
  >;
}

export namespace FindByEmailTokenForgotPasswordRepositoryDTO {
  export type Params = {
    email: string;
  };

  export type Result = Either<
    undefined,
    {
      tokenForgotPassword: TokenForgotPasswordModel;
    }
  >;
}
