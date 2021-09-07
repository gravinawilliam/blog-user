import { UserModel } from '@domain/models/user.model';
import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { ICreateUserDTO } from '@dtos/users/create-user.dto';

export class FakeUserRepository
  implements ICreateUserRepository, IFindEmailUserRepository
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

  async findEmail(email: string): Promise<UserModel> {
    const userFound = this.users.find((user) => user.email === email);
    return userFound;
  }
}
