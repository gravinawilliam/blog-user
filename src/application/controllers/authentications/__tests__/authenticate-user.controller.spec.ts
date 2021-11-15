import { AuthenticateUserController } from '@application/controllers/authentications/authenticate-user.controller';
import { AuthenticateUserUseCase } from '@application/use-cases/authentications/authenticate-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { AuthenticateUserValidator } from '@application/validators/authentications/authenticate-user.validator';

import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';
import { ITokenJwtGenerator } from '@domain/providers/token/jwt/token-jwt-generator.provider';
import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import { ICreateFailureUserAccessLogRepository } from '@domain/repositories/user-access-log/create-failure-user-access-log.repository';
import { ICreateSuccessUserAccessLogRepository } from '@domain/repositories/user-access-log/create-success-user-access-log.repository';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IAuthenticateUserUseCase } from '@domain/use-cases/authentications/authenticate-user.usecase';
import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IAuthenticateUserValidator } from '@domain/validators/authentications/authenticate-user.validator';

import FakeUserAccessLogRepository from '@fakes/database/repositories/user-access-log-fake.repository';
import { FakeUserRepository } from '@fakes/database/repositories/users-fake.repository';
import { FakeComparePasswordEncrypted } from '@fakes/providers/encryption/compare-password-encrypted.fake.provider';
import { FakeTokenJwt } from '@fakes/providers/token/fake-token-jwt.provider';
import { FakeUuidGenerator } from '@fakes/providers/uuid/uuid-generator.fake.provider';
import { FakeEmailValidator } from '@fakes/validators/email.fake.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { HttpStatusCode } from '@shared/utils/http-status-code';

let authenticateUserController: IController;
let authenticateUserUseCase: IAuthenticateUserUseCase;
let authenticateUserValidator: IAuthenticateUserValidator;
let tokenProvider: ITokenJwtGenerator;
let requiredFieldsValidator: IRequiredFieldsValidator;
let fakeUsersRepository: ICreateUserRepository & IFindEmailUserRepository;
let fakeUuidGenerator: IUuidGenerator;
let emailValidator: IEmailValidator;
let comparePasswordEncrypted: IComparePasswordEncrypted;
let userAccessLogRepository: ICreateSuccessUserAccessLogRepository &
  ICreateFailureUserAccessLogRepository;

describe('AuthenticateUserController', () => {
  beforeEach(() => {
    fakeUuidGenerator = new FakeUuidGenerator();
    requiredFieldsValidator = new RequiredFieldsValidator();
    fakeUsersRepository = new FakeUserRepository(fakeUuidGenerator);
    emailValidator = new FakeEmailValidator();
    comparePasswordEncrypted = new FakeComparePasswordEncrypted();
    userAccessLogRepository = new FakeUserAccessLogRepository(
      fakeUuidGenerator,
    );
    authenticateUserValidator = new AuthenticateUserValidator(
      requiredFieldsValidator,
      fakeUsersRepository,
      emailValidator,
      comparePasswordEncrypted,
      userAccessLogRepository,
    );
    tokenProvider = new FakeTokenJwt();
    authenticateUserUseCase = new AuthenticateUserUseCase(tokenProvider);
    authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCase,
      authenticateUserValidator,
    );
  });

  it('should be able to authenticate user', async () => {
    await fakeUsersRepository.create({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken.com.br',
      password: '3k8EG923iA',
    });

    const authenticated = await authenticateUserController.handle({
      body: {
        email: 'gabriellycardoso@heineken.com.br',
        password: '3k8EG923iA',
      },
    });
    expect(authenticated.body).toHaveProperty('token');
    expect(authenticated.body).toHaveProperty('user');
    expect(authenticated.statusCode).toBe(HttpStatusCode.OK);
  });

  it('should not be able to authenticate user with invalid email', async () => {
    const authenticated = await authenticateUserController.handle({
      body: {
        email: 'invalidEmail', // ? invalid email
        password: '3k8EG923iA',
      },
    });
    expect(authenticated.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should not be able to authenticate user with invalid password', async () => {
    await fakeUsersRepository.create({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken123.com.br',
      password: '3k8EG923iA',
    });
    const authenticated = await authenticateUserController.handle({
      body: {
        email: 'gabriellycardoso@heineken123.com.br',
        password: 'invalid password', // ? invalid password
      },
    });
    expect(authenticated.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should not be able to authenticate user with not exits email', async () => {
    const authenticated = await authenticateUserController.handle({
      body: {
        email: 'murilogiovannileandronovaes_@quimicaindaiatuba.com.br',
        password: '3k8EG923iA',
      },
    });
    expect(authenticated.statusCode).toBe(HttpStatusCode.NOT_FOUND);
  });

  it('should not be able to create user with fields null', async () => {
    const user = await authenticateUserController.handle({
      body: { name: 'Natália Luna Kamilly Monteiro' },
    });
    expect(user.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
});
