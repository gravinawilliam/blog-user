import { UserDataReplicationDTO } from '@dtos/providers/data-replications/user-data-replication.dto';

export interface IUserDataReplication {
  user(params: UserDataReplicationDTO.Params): UserDataReplicationDTO.Result;
}
