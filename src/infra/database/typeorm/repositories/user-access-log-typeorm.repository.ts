import { getRepository, Repository } from 'typeorm';

import { ICreateFailureUserAccessLogRepository } from '@domain/repositories/user-access-log/create-failure-user-access-log.repository';
import { ICreateSuccessUserAccessLogRepository } from '@domain/repositories/user-access-log/create-success-user-access-log.repository';
import { IFindByUserIdUserAccessLogRepository } from '@domain/repositories/user-access-log/find-by-user-id-user-access-log.repository';

import {
  IRequestCreateUserAccessLogDTO,
  IResquestFindByUserIdUserAccessLog,
} from '@dtos/_shared/validation-login-attempts.dto';

import { UserAccessLogModel } from '@models/user-access-log.model';

import { UserAccessLogEntity } from '../entities/user-access-log.entity';

export default class UserAccessLogTypeormRepository
  implements
    IFindByUserIdUserAccessLogRepository,
    ICreateSuccessUserAccessLogRepository,
    ICreateFailureUserAccessLogRepository
{
  private ormRepository: Repository<UserAccessLogEntity>;

  constructor() {
    this.ormRepository = getRepository(UserAccessLogEntity);
  }

  public async createFailure({
    userId,
  }: IRequestCreateUserAccessLogDTO): Promise<void> {
    const created = this.ormRepository.create({ authenticated: false, userId });
    await this.ormRepository.save(created);
  }

  async createSuccess({
    userId,
  }: IRequestCreateUserAccessLogDTO): Promise<void> {
    const created = this.ormRepository.create({ authenticated: true, userId });
    await this.ormRepository.save(created);
    const logs = await this.ormRepository.find({
      where: {
        userId,
        authenticated: false,
      },
    });
    // eslint-disable-next-line no-restricted-syntax
    for await (const log of logs) {
      await this.ormRepository.softDelete(log);
    }
  }

  public async findByUserId({
    authenticated,
    userId,
  }: IResquestFindByUserIdUserAccessLog): Promise<UserAccessLogModel[]> {
    return await this.ormRepository.find({
      where: {
        userId,
        authenticated,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
