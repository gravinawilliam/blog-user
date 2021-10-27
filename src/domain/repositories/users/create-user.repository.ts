import { ICreateUserDTO } from '@dtos/users/create-user.dto';

import { UserModel } from '@models/user.model';

export interface ICreateUserRepository {
  create(user: ICreateUserDTO): Promise<UserModel>;
}
