import { getRepository, Repository } from 'typeorm';

import { ICreateReviwerRepository } from '@domain/repositories/reviwers/create-reviwer.repository';
import { IFindByUserIdReviwersRepository } from '@domain/repositories/reviwers/find-by-user-id-reviwers.repository';

import { ICreateReviwerDTO } from '@dtos/reviwers/create-reviwer.dto';

import { ReviwerModel } from '@models/reviwer.model';

import { ReviwerEntity } from '../entities/reviwer.entity';

export default class ReviwersTypeormRepository
  implements ICreateReviwerRepository, IFindByUserIdReviwersRepository
{
  private ormRepository: Repository<ReviwerEntity>;

  constructor() {
    this.ormRepository = getRepository(ReviwerEntity);
  }

  public async create(params: ICreateReviwerDTO): Promise<ReviwerModel> {
    const reviwerCreated = this.ormRepository.create(params);
    await this.ormRepository.save(reviwerCreated);
    return reviwerCreated;
  }

  public async findByUserId(userId: string): Promise<ReviwerModel> {
    const reviwerFound = await this.ormRepository.findOne({
      where: {
        userId,
      },
    });
    return reviwerFound;
  }
}
