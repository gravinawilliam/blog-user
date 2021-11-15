import { IUserDataReplication } from '@domain/providers/data-replications/users/user-data-replication.provider';
import { IPostHttp } from '@domain/providers/http/post-http.provider';
import { IPutHttp } from '@domain/providers/http/put-http.provider';

import { UserDataReplicationDTO } from '@dtos/providers/data-replications/user-data-replication.dto';

import { envConfig } from '@main/config/env.config';

export class UserDataReplication implements IUserDataReplication {
  constructor(private readonly httpRequest: IPostHttp & IPutHttp) {}

  async user({
    user,
    type,
  }: UserDataReplicationDTO.Params): UserDataReplicationDTO.Result {
    await this.httpRequest.post({
      data: {
        user,
        type,
        producer: 'blog-user',
        key: envConfig.dataReplication.key,
      },
      url: `${envConfig.url.internalMicroServices.dataReplication}/user`,
    });
  }
}
