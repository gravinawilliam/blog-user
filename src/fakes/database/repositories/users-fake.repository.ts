import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IFindByIdUserRepository } from '@domain/repositories/users/find-by-id-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IUpdateUserRepository } from '@domain/repositories/users/update-user.repository';

import { ICreateUserDTO } from '@dtos/users/create-user.dto';

import { UserModel } from '@models/user.model';

export class FakeUserRepository
  implements
    ICreateUserRepository,
    IFindEmailUserRepository,
    IFindByIdUserRepository,
    IDeleteUserRepository,
    IUpdateUserRepository
{
  constructor(private readonly uuidGenerator: IUuidGenerator) {}

  private users: UserModel[] = [];

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async create(user: ICreateUserDTO): Promise<UserModel> {
    const userCreated = Object.assign(new UserModel(), {
      id: this.uuidGenerator.generate(),
      ...user,
    });
    this.users.push(userCreated);
    return userCreated;
  }

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async delete(id: string): Promise<void> {
    const findIndex = this.users.findIndex(i => i.id === id);
    this.users.splice(findIndex, 1);
  }

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async findById(id: string): Promise<UserModel> {
    return this.users.find(user => user.id === id);
  }

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async findEmail(email: string): Promise<UserModel> {
    return this.users.find(user => user.email === email);
  }

  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async update(user: UserModel): Promise<UserModel> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}
