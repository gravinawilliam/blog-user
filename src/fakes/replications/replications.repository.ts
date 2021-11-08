import { ICreateUserDataReplication } from '@domain/providers/data-replications/users/create-user-data-replication.provider';
import { IUpdateUserDataReplicationProvider } from '@domain/providers/data-replications/users/update-user-data-replication.provider';

import { UserModel } from '@models/user.model';

export class FakeDataReplicationsRepository
  implements ICreateUserDataReplication, IUpdateUserDataReplicationProvider
{
  private users: UserModel[] = [];

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  public async createUser(user: UserModel): Promise<void> {
    const userCreated = Object.assign(new UserModel(), user);
    this.users.push(userCreated);
  }

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async updateUser(user: UserModel): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
  }
}
