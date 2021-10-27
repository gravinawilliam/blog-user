import { UserModel } from '@models/user.model';

export interface ICreateUserDataReplication {
  createUser(user: UserModel): Promise<void>;
}
