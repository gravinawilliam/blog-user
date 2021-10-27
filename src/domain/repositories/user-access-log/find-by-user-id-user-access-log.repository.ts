import { IResquestFindByUserIdUserAccessLog } from '@dtos/_shared/validation-login-attempts.dto';

import { UserAccessLogModel } from '@models/user-access-log.model';

export interface IFindByUserIdUserAccessLogRepository {
  findByUserId(
    params: IResquestFindByUserIdUserAccessLog,
  ): Promise<UserAccessLogModel[]>;
}
