import { ReviwerModel } from '@models/reviwer.model';

export interface IFindByUserIdReviwersRepository {
  findByUserId(userId: string): Promise<ReviwerModel | undefined>;
}
