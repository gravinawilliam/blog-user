import { ICreateUserDataReplication } from '@domain/providers/data-replications/users/create-user-data-replication.provider';
import { IUpdateUserDataReplicationProvider } from '@domain/providers/data-replications/users/update-user-data-replication.provider';
import { IPostHttp } from '@domain/providers/http/post-http.provider';
import { IPutHttp } from '@domain/providers/http/put-http.provider';

import { UserModel } from '@models/user.model';

import { envConfig } from '@main/config/env.config';

export class UserDataReplication
  implements ICreateUserDataReplication, IUpdateUserDataReplicationProvider
{
  constructor(private readonly httpRequest: IPostHttp & IPutHttp) {}

  public async createUser(user: UserModel): Promise<void> {
    await this.httpRequest.post({
      data: user,
      url: `${envConfig.url.internalMicroServices.dataReplication}/users/replication/create`,
    });
  }

  public async updateUser(user: UserModel): Promise<void> {
    await this.httpRequest.put({
      data: user,
      url: `${envConfig.url.internalMicroServices.dataReplication}/users/replication/update`,
    });
  }
}
