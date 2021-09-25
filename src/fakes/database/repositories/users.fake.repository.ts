import { UserModel } from '@domain/models/user.model';
import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IFindByIdUserRepository } from '@domain/repositories/users/find-by-id-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';

import { ICreateUserDTO } from '@dtos/users/create-user.dto';

export class FakeUserRepository
  implements
    ICreateUserRepository,
    IFindEmailUserRepository,
    IFindByIdUserRepository,
    IDeleteUserRepository
{
  constructor(private readonly uuidGenerator: IUuidGenerator) {}

  private users: UserModel[] = [];

  async create(user: ICreateUserDTO): Promise<UserModel> {
    const userCreated = Object.assign(new UserModel(), {
      id: this.uuidGenerator.generate(),
      ...user,
    });
    this.users.push(userCreated);
    return userCreated;
  }

  // eslint-disable-next-line consistent-return
  async delete(id: string): Promise<void> {
    const findIndex = this.users.findIndex(i => i.id === id);
    this.users.splice(findIndex, 1);
  }

  async findById(id: string): Promise<UserModel> {
    const userFound = this.users.find(user => user.id === id);
    return userFound;
  }

  async findEmail(email: string): Promise<UserModel> {
    const userFound = this.users.find(user => user.email === email);
    return userFound;
  }
}
