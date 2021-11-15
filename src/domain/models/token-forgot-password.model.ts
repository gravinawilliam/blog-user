import { BaseModel } from '@models/_base.model';

export class TokenForgotPasswordModel extends BaseModel {
  userId: string;

  token: string;

  email: string;
}
