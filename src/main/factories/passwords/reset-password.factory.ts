import { ResetPasswordController } from '@application/controllers/passwords/reset-password.controller';
import { ResetPasswordTransformer } from '@application/transformers/passwords/reset-password.transformer';
import { ResetPasswordUseCase } from '@application/use-cases/passwords/reset-password.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { ResetPasswordValidator } from '@application/validators/passwords/reset-password.validator';

import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';
import { IFindByEmailTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/find-by-email-token-forgot-password.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IUpdateUserRepository } from '@domain/repositories/users/update-user.repository';
import { IResetPasswordTransformer } from '@domain/transformers/passwords/reset-password.transformer';
import { IResetPasswordUseCase } from '@domain/use-cases/passwords/reset-password.usecase';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IResetPasswordValidator } from '@domain/validators/passwords/reset-password.validator';

import TokensForgotPasswordTypeormRepository from '@infra/database/typeorm/repositories/tokens-forgot-password.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { PasswordEncryption } from '@infra/providers/encryption/password-encryption.provider';

import { IController } from '@shared/interfaces/controller.interface';

let resetPasswordValidator: IResetPasswordValidator;
let resetPasswordTransformer: IResetPasswordTransformer;
let resetPasswordUseCase: IResetPasswordUseCase;
let passwordEncryption: IPasswordEncryption;
let tokensForgotPasswordRepository: IFindByEmailTokenForgotPasswordRepository;
let usersRepository: IFindEmailUserRepository & IUpdateUserRepository;
let requiredFieldsValidator: IRequiredFieldsValidator;

export const makeResetPasswordController = (): IController => {
  requiredFieldsValidator = new RequiredFieldsValidator();
  usersRepository = new UsersTypeormRepository();
  tokensForgotPasswordRepository = new TokensForgotPasswordTypeormRepository();
  passwordEncryption = new PasswordEncryption();
  resetPasswordValidator = new ResetPasswordValidator(
    requiredFieldsValidator,
    usersRepository,
    tokensForgotPasswordRepository,
  );
  resetPasswordTransformer = new ResetPasswordTransformer(passwordEncryption);
  resetPasswordUseCase = new ResetPasswordUseCase(usersRepository);
  return new ResetPasswordController(
    resetPasswordValidator,
    resetPasswordTransformer,
    resetPasswordUseCase,
  );
};
