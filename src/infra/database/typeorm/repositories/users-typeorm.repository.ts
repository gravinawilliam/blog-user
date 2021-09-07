import { UserModel } from '@domain/models/user.model';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { ICreateUserDTO } from '@dtos/users/create-user.dto';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export default class UsersTypeormRepository
  implements ICreateUserRepository, IFindEmailUserRepository
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

  public async findEmail(email: string): Promise<UserModel> {
    const userFound = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return userFound;
  }
}
