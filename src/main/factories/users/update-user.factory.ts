import { UpdateUserController } from '@application/controllers/users/update-user.controller';
import { UpdateUserTransformer } from '@application/transformers/users/update-user.transformer';
import { UpdateUserUseCase } from '@application/use-cases/users/update-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { UpdateUserValidator } from '@application/validators/users/update-user.validator';

import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { UserDataReplication } from '@infra/providers/data-replications/users/user-data-replication.provider';
import { ComparePasswordEncrypted } from '@infra/providers/encryption/compare-password-encrypted.provider';
import { PasswordEncryption } from '@infra/providers/encryption/password-encryption.provider';
import { AxiosHttpProvider } from '@infra/providers/http/axios.provider';
import { TokenJwt } from '@infra/providers/token-jwt/token-jwt.provider';
import { EmailValidator } from '@infra/validators/email.validator';
import { PasswordValidator } from '@infra/validators/password.validator';

import { IController } from '@shared/interfaces/controller.interface';

export const makeUpdateUserController = (): IController => {
  const httpRequest = new AxiosHttpProvider();
  const dataReplications = new UserDataReplication(httpRequest);
  const passwordValidator = new PasswordValidator();
  const emailValidator = new EmailValidator();
  const comparePasswordEncrypted = new ComparePasswordEncrypted();
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const usersRepository = new UsersTypeormRepository();
  const tokenProvider = new TokenJwt();
  const updateUserValidator = new UpdateUserValidator(
    requiredFieldsValidator,
    usersRepository,
    comparePasswordEncrypted,
    tokenProvider,
    emailValidator,
    passwordValidator,
  );
  const updateUserUseCase = new UpdateUserUseCase(
    usersRepository,
    dataReplications,
  );
  const passwordEncryption = new PasswordEncryption();
  const updateUserTransformer = new UpdateUserTransformer(passwordEncryption);
  return new UpdateUserController(
    updateUserValidator,
    updateUserTransformer,
    updateUserUseCase,
  );
};
