import { ICreateReviwerDTO } from '@dtos/reviwers/create-reviwer.dto';

import { ReviwerModel } from '@models/reviwer.model';

export interface ICreateReviwerRepository {
  create(params: ICreateReviwerDTO): Promise<ReviwerModel>;
}
