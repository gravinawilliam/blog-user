import { ICreateUserDataReplication } from '@domain/providers/data-replications/users/create-user-data-replication.provider';

import { UserModel } from '@models/user.model';

export class FakeDataReplicationsRepository
  implements ICreateUserDataReplication
{
  private users: UserModel[] = [];

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  public async createUser(user: UserModel): Promise<void> {
    const userCreated = Object.assign(new UserModel(), user);
    this.users.push(userCreated);
  }
}
