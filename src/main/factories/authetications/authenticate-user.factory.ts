import { AuthenticateUserController } from '@application/controllers/authentications/authenticate-user.controller';
import { AuthenticateUserUsecase } from '@application/use-cases/authentications/authenticate-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { ValidationLoginAttemptsValidator } from '@application/validators/_shared/validation-login-attempts.validator';
import { AuthenticateUserValidator } from '@application/validators/authentications/authenticate-user.validator';

import UserAccessLogTypeormRepository from '@infra/database/typeorm/repositories/user-access-log-typeorm.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { ComparePasswordEncrypted } from '@infra/providers/encryption/compare-password-encrypted.provider';
import { TokenJwt } from '@infra/providers/token-jwt/token-jwt.provider';
import { EmailValidator } from '@infra/validators/email.validator';

export const makeAuthenticateUserController =
  (): AuthenticateUserController => {
    const requiredFieldsValidator = new RequiredFieldsValidator();
    const usersRepository = new UsersTypeormRepository();
    const emailValidator = new EmailValidator();
    const comparePasswordEncrypted = new ComparePasswordEncrypted();
    const userAccessLogRepository = new UserAccessLogTypeormRepository();
    const validationLoginAttempts = new ValidationLoginAttemptsValidator(
      userAccessLogRepository,
    );
    const authenticateUserValidator = new AuthenticateUserValidator(
      requiredFieldsValidator,
      usersRepository,
      emailValidator,
      comparePasswordEncrypted,
      validationLoginAttempts,
      userAccessLogRepository,
    );
    const tokenGenerator = new TokenJwt();
    const authenticateUserUsecase = new AuthenticateUserUsecase(tokenGenerator);
    return new AuthenticateUserController(
      authenticateUserUsecase,
      authenticateUserValidator,
    );
  };