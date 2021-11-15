import { UserModel } from '@models/user.model';

export interface IDeleteUserRepository {
  delete(user: UserModel): Promise<UserModel>;
}
