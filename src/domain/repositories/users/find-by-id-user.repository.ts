import { UserModel } from '@domain/models/user.model';

export interface IFindByIdUserRepository {
  findById(id: string): Promise<UserModel | undefined>;
}
