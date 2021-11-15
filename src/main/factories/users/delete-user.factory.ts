import { DeleteUserController } from '@application/controllers/users/delete-user.controller';
import { DeleteUserUseCase } from '@application/use-cases/users/delete-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { DeleteUserValidator } from '@application/validators/users/delete-user.validator';

import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { UserDataReplication } from '@infra/providers/data-replications/users/user-data-replication.provider';
import { ComparePasswordEncrypted } from '@infra/providers/encryption/compare-password-encrypted.provider';
import { AxiosHttpProvider } from '@infra/providers/http/axios.provider';
import { TokenJwtProvider } from '@infra/providers/token/jwt/token-jwt.provider';

import { IController } from '@shared/interfaces/controller.interface';

export const makeDeleteUserController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const usersRepository = new UsersTypeormRepository();
  const comparePasswordEncrypted = new ComparePasswordEncrypted();
  const tokenProvider = new TokenJwtProvider();
  const deleteUserValidator = new DeleteUserValidator(
    requiredFieldsValidator,
    usersRepository,
    comparePasswordEncrypted,
    tokenProvider,
  );
  const httpRequest = new AxiosHttpProvider();
  const dataReplications = new UserDataReplication(httpRequest);
  const deleteUserUseCase = new DeleteUserUseCase(
    usersRepository,
    dataReplications,
  );
  return new DeleteUserController(deleteUserUseCase, deleteUserValidator);
};
