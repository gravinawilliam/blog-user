import { CreateReviwerController } from '@application/controllers/reviwers/create-reviwer.controller';
import { CreateReviwerUseCase } from '@application/use-cases/reviwers/create-reviwer.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { CreateReviwerValidator } from '@application/validators/reviwers/create-reviwer.validator';

import ReviwersTypeormRepository from '@infra/database/typeorm/repositories/reviwers-typeorm.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

import { TokenJwt } from '../../../infra/providers/token-jwt/token-jwt.provider';

export const makeCreateReviwerController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();

  const reviwersRepository = new ReviwersTypeormRepository();
  const ceateReviwerUseCase = new CreateReviwerUseCase(reviwersRepository);
  const tokenProvider = new TokenJwt();
  const usersRepository = new UsersTypeormRepository();
  const createReviwerValidator = new CreateReviwerValidator(
    requiredFieldsValidator,
    reviwersRepository,
    usersRepository,
    tokenProvider,
  );
  return new CreateReviwerController(
    ceateReviwerUseCase,
    createReviwerValidator,
  );
};
