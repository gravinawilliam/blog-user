import { UserModel } from '@domain/models/user.model';

export interface IFindEmailUserRepository {
  findEmail(email: string): Promise<UserModel | undefined>;
}
