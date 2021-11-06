import { AuthenticateUserUseCase } from '@application/use-cases/authentications/authenticate-user.usecase';
import { DeleteUserUseCase } from '@application/use-cases/users/delete-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { DeleteUserValidator } from '@application/validators/users/delete-user.validator';

import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';
import { ITokenGenerator } from '@domain/providers/token/token-generator.provider';
import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IFindByIdUserRepository } from '@domain/repositories/users/find-by-id-user.repository';
import { IAuthenticateUserUseCase } from '@domain/use-cases/authentications/authenticate-user.usecase';
import { IDeleteUserUseCase } from '@domain/use-cases/users/delete-user.usecase';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IDeleteUserValidator } from '@domain/validators/users/delete-user.validator';

import { FakeUserRepository } from '@fakes/database/repositories/users-fake.repository';
import { FakeComparePasswordEncrypted } from '@fakes/providers/encryption/compare-password-encrypted.fake.provider';
import { FakeUuidGenerator } from '@fakes/providers/uuid/uuid-generator.fake.provider';

import { TokenJwt } from '@infra/providers/token-jwt/token-jwt.provider';

import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { RequiredParamError } from '@shared/errors/required-param.error';
import { UnauthorizedError } from '@shared/errors/unauthorized.error';
import { IController } from '@shared/interfaces/controller.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { HttpStatusCode } from '@shared/utils/http-status-code';

import { DeleteUserController } from '../delete-user.controller';

let deleteUserController: IController;
let deleteUserUseCase: IDeleteUserUseCase;
let deleteUserValidator: IDeleteUserValidator;
let fakeUsersRepository: ICreateUserRepository &
  IFindByIdUserRepository &
  IDeleteUserRepository;
let fakeUuidGenerator: IUuidGenerator;
let comparePasswordEncrypted: IComparePasswordEncrypted;
let requiredFieldsValidator: IRequiredFieldsValidator;
let tokenProvider: ITokenVerify & ITokenGenerator;
// ? authenticate
let authenticateUserUseCase: IAuthenticateUserUseCase;

describe('DeleteUserController', () => {
  beforeEach(() => {
    fakeUuidGenerator = new FakeUuidGenerator();
    requiredFieldsValidator = new RequiredFieldsValidator();
    fakeUsersRepository = new FakeUserRepository(fakeUuidGenerator);
    deleteUserUseCase = new DeleteUserUseCase(fakeUsersRepository);
    comparePasswordEncrypted = new FakeComparePasswordEncrypted();
    tokenProvider = new TokenJwt();
    deleteUserValidator = new DeleteUserValidator(
      requiredFieldsValidator,
      fakeUsersRepository,
      comparePasswordEncrypted,
      tokenProvider,
    );
    deleteUserController = new DeleteUserController(
      deleteUserUseCase,
      deleteUserValidator,
    );
    // ? authenticate
    authenticateUserUseCase = new AuthenticateUserUseCase(tokenProvider);
  });

  it('should be able to delete user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken.com.br',
      password: '3k8EG923iA',
    });

    const { token } = authenticateUserUseCase.execute({
      userId: user.id,
    });

    const userDeleted = await deleteUserController.handle({
      body: {
        password: user.password,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    expect(userDeleted.body).toBe(true);
    expect(userDeleted.statusCode).toBe(HttpStatusCode.OK);
  });

  it('should not be able to delete user', async () => {
    const error = new InvalidParamError('password');
    const user = await fakeUsersRepository.create({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken.com.br',
      password: '3k8EG923iA',
    });

    const { token } = authenticateUserUseCase.execute({
      userId: user.id,
    });

    const userDeleted = await deleteUserController.handle({
      body: {
        password: '',
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    expect(userDeleted).toEqual({
      statusCode: HttpStatusCode.BAD_REQUEST,
      body: error,
    } as IHttpResponse);
  });

  it('should not be able to delete user with password null', async () => {
    const error = new RequiredParamError('authorization, password');

    const userDeleted = await deleteUserController.handle({
      body: {
        password: null,
      },
      headers: {
        authorization: null,
      },
    });
    expect(userDeleted).toEqual({
      statusCode: HttpStatusCode.BAD_REQUEST,
      body: error,
    } as IHttpResponse);
  });

  it('should not be able to delete user with user id nonexistent', async () => {
    const error = new NotFoundModelError('user');
    const token =
      'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzYyMzQ2MzIsImV4cCI6MTYzNjQ5MzgzMiwiaXNzIjoidyIsInN1YiI6IjVjYmM4ZTJiLWRkNjUtNGQ5OC1iNWUyLTdiMTdhNzliNWUwZCJ9.m5lS0YvycmgmsFnjp3SGVkIe1jatAXo0D2KeRf5ADALk5KPFBFE2JW6AzbyQXiSY';

    const userDeleted = await deleteUserController.handle({
      body: {
        password: '12313',
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(userDeleted).toEqual({
      statusCode: HttpStatusCode.NOT_FOUND,
      body: error,
    } as IHttpResponse);
  });

  it('should not be able to delete user with invalid token', async () => {
    const error = new UnauthorizedError('Invalid JWT token');
    const token =
      'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzYyMzQ2MzIsImV4cCI6MY';

    const userDeleted = await deleteUserController.handle({
      body: {
        password: '12313',
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(userDeleted).toEqual({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      body: error,
    } as IHttpResponse);
  });
});
