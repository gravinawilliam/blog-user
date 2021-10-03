import { ICreateReviwerRepository } from '@domain/repositories/reviwers/create-reviwer.repository';
import { ICreateReviwerUseCase } from '@domain/use-cases/reviwers/create-reviwer.usecase';

import {
  ICreateReviwerUseCaseResponseDTO,
  IRequestCreateReviwerUseCaseDTO,
} from '@dtos/reviwers/create-reviwer.dto';

export class CreateReviwerUseCase implements ICreateReviwerUseCase {
  constructor(private readonly reviwersRepository: ICreateReviwerRepository) {}

  async execute(
    params: IRequestCreateReviwerUseCaseDTO,
  ): Promise<ICreateReviwerUseCaseResponseDTO> {
    const reviwer = await this.reviwersRepository.create(params);
    return {
      reviwerStatus: reviwer.reviwerStatus,
    };
  }
}
