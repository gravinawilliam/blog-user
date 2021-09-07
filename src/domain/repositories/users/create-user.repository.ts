import { UserModel } from '@domain/models/user.model';
import { ICreateUserDTO } from '@dtos/users/create-user.dto';

export interface ICreateUserRepository {
  create(user: ICreateUserDTO): Promise<UserModel>;
}
