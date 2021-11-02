import { BaseModel } from '@models/_base.model';

export class UserModel extends BaseModel {
  name: string;

  email: string;

  password: string;

  avatar: string;
}
