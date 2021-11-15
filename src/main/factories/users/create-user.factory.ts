import { CreateUserController } from '@application/controllers/users/create-user.controller';
import { CreateUserTransformer } from '@application/transformers/users/create-user.transformer';
import { CreateUserUseCase } from '@application/use-cases/users/create-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { CreateUserValidator } from '@application/validators/users/create-user.validator';

import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { UserDataReplication } from '@infra/providers/data-replications/users/user-data-replication.provider';
import { PasswordEncryption } from '@infra/providers/encryption/password-encryption.provider';
import { AxiosHttpProvider } from '@infra/providers/http/axios.provider';
import { EmailValidator } from '@infra/validators/email.validator';
import { PasswordValidator } from '@infra/validators/password.validator';

import { IController } from '@shared/interfaces/controller.interface';

export const makeCreateUserController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const usersRepository = new UsersTypeormRepository();
  const emailValidator = new EmailValidator();
  const passwordEncryption = new PasswordEncryption();
  const passwordValidator = new PasswordValidator();
  const createUserValidator = new CreateUserValidator(
    requiredFieldsValidator,
    usersRepository,
    emailValidator,
    passwordValidator,
  );
  const httpRequest = new AxiosHttpProvider();
  const dataReplications = new UserDataReplication(httpRequest);
  const createUserUseCase = new CreateUserUseCase(
    usersRepository,
    dataReplications,
  );
  const createUserTransformer = new CreateUserTransformer(passwordEncryption);
  return new CreateUserController(
    createUserUseCase,
    createUserValidator,
    createUserTransformer,
  );
};
