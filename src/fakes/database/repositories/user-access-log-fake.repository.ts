import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import { ICreateFailureUserAccessLogRepository } from '@domain/repositories/user-access-log/create-failure-user-access-log.repository';
import { ICreateSuccessUserAccessLogRepository } from '@domain/repositories/user-access-log/create-success-user-access-log.repository';

import { IRequestCreateUserAccessLogDTO } from '@dtos/_shared/validation-login-attempts.dto';

import { UserAccessLogModel } from '@models/user-access-log.model';

export default class FakeUserAccessLogRepository
  implements
    ICreateSuccessUserAccessLogRepository,
    ICreateFailureUserAccessLogRepository
{
  constructor(private readonly uuidGenerator: IUuidGenerator) {}

  private userAcessLogs: UserAccessLogModel[] = [];

  // eslint-disable-next-line require-await
  public async createFailure({
    userId,
  }: IRequestCreateUserAccessLogDTO): Promise<void> {
    const created = Object.assign(new UserAccessLogModel(), {
      id: this.uuidGenerator.generate(),
      authenticated: false,
      userId,
    });
    this.userAcessLogs.push(created);
  }

  // eslint-disable-next-line require-await
  async createSuccess({
    userId,
  }: IRequestCreateUserAccessLogDTO): Promise<void> {
    const created = Object.assign(new UserAccessLogModel(), {
      id: this.uuidGenerator.generate(),
      authenticated: true,
      userId,
    });
    this.userAcessLogs.push(created);

    const logs = this.userAcessLogs.filter(log => {
      return log.userId === userId && log.authenticated === false;
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const log of logs) {
      const findIndex = this.userAcessLogs.findIndex(
        findUser => findUser.userId === log.userId,
      );
      this.userAcessLogs[findIndex] = log;
    }
  }
}
