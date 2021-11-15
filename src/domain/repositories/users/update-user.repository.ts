import { UserModel } from '@models/user.model';

export interface IUpdateUserRepository {
  update(user: UserModel): Promise<UserModel>;
}
