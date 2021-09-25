import { DeleteUserController } from '@application/controllers/users/delete-user.controller';
import { DeleteUserUsecase } from '@application/use-cases/users/delete-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { DeleteUserValidator } from '@application/validators/users/delete-user.validator';

import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { ComparePasswordEncrypted } from '@infra/providers/encryption/compare-password-encrypted.provider';

import { IController } from '@shared/interfaces/controller.interface';

export const makeDeleteUserController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const usersRepository = new UsersTypeormRepository();
  const comparePasswordEncrypted = new ComparePasswordEncrypted();
  const deleteUserValidator = new DeleteUserValidator(
    requiredFieldsValidator,
    usersRepository,
    comparePasswordEncrypted,
  );
  const deleteUserUsecase = new DeleteUserUsecase(usersRepository);
  return new DeleteUserController(deleteUserUsecase, deleteUserValidator);
};
