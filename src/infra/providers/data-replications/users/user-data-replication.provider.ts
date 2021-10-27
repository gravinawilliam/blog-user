import { ICreateUserDataReplication } from '@domain/providers/data-replications/users/create-user-data-replication.provider';
import { IPostHttp } from '@domain/providers/http/http.provider';

import { UserModel } from '@models/user.model';

import { envConfig } from '@main/config/env.config';

export class UserDataReplication implements ICreateUserDataReplication {
  constructor(private readonly httpRequest: IPostHttp) {}

  public async createUser(user: UserModel): Promise<void> {
    await this.httpRequest.post({
      data: user,
      url: envConfig.url.internalMicroServices.dataReplication,
    });
  }
}
