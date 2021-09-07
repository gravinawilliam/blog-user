import { CreateUserController } from '@application/controllers/users/create-user.controller';
import { CreateUserUsecase } from '@application/use-cases/users/create-user.usecase';
import { CreateUserValidator } from '@application/validators/users/create-user.validator';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { PasswordEncryption } from '@infra/providers/encryption/password-encryption.provider';
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
  const createUserUsecase = new CreateUserUsecase(
    usersRepository,
    passwordEncryption,
  );
  return new CreateUserController(createUserUsecase, createUserValidator);
};
