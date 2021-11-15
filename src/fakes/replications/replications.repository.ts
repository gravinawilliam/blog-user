import { IUserDataReplication } from '@domain/providers/data-replications/users/user-data-replication.provider';

import { UserDataReplicationDTO } from '@dtos/providers/data-replications/user-data-replication.dto';

import { UserModel } from '@models/user.model';

export class FakeDataReplicationsRepository implements IUserDataReplication {
  private users: UserModel[] = [];

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async user({
    type,
    user,
  }: UserDataReplicationDTO.Params): UserDataReplicationDTO.Result {
    if (type === 'create') {
      const userCreated = Object.assign(new UserModel(), user);
      this.users.push(userCreated);
    } else if (type === 'update') {
      const findIndex = this.users.findIndex(
        findUser => findUser.id === user.id,
      );
      this.users[findIndex] = user;
    }
  }
}
