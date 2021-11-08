import { UserModel } from '@models/user.model';

export interface IUpdateUserDataReplicationProvider {
  updateUser(user: UserModel): Promise<void>;
}
