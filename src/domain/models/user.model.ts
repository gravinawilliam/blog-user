import { BaseModel } from './_base.model';

export class UserModel extends BaseModel {
  name: string;
  email: string;
  password: string;
}
