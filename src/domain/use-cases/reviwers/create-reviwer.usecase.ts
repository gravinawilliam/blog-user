import {
  ICreateReviwerUseCaseResponseDTO,
  IRequestCreateReviwerUseCaseDTO,
} from '@dtos/reviwers/create-reviwer.dto';

export interface ICreateReviwerUseCase {
  execute(
    params: IRequestCreateReviwerUseCaseDTO,
  ): Promise<ICreateReviwerUseCaseResponseDTO>;
}
