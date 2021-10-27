import { getRepository, Repository } from 'typeorm';

import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IFindByIdUserRepository } from '@domain/repositories/users/find-by-id-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';

import { ICreateUserDTO } from '@dtos/users/create-user.dto';

import { UserModel } from '@models/user.model';

import { UserEntity } from '../entities/user.entity';

export default class UsersTypeormRepository
  implements
    ICreateUserRepository,
    IFindEmailUserRepository,
    IDeleteUserRepository,
    IFindByIdUserRepository
{
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity);
  }

  public async create(user: ICreateUserDTO): Promise<UserModel> {
    const userCreated = this.ormRepository.create(user);
    await this.ormRepository.save(userCreated);
    return userCreated;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async findEmail(email: string): Promise<UserModel> {
    const userFound = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return userFound;
  }

  public async findById(id: string): Promise<UserModel> {
    const userFound = await this.ormRepository.findOne(id);
    return userFound;
  }
}
