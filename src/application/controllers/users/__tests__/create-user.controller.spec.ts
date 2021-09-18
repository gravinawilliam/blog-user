import { CreateUserUsecase } from '@application/use-cases/users/create-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { CreateUserValidator } from '@application/validators/users/create-user.validator';

import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';
import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { ICreateUserUsecase } from '@domain/use-cases/users/create-user.usecase';
import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import { IPasswordValidator } from '@domain/validators/_shared/password.validator';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ICreateUserValidator } from '@domain/validators/users/create-user.validator';

import { FakeUserRepository } from '@fakes/database/repositories/users.fake.repository';
import { FakePasswordEncryption } from '@fakes/providers/encryption/password-encryption.fake.provider';
import { FakeUuidGenerator } from '@fakes/providers/uuid/uuid-generator.fake.provider';
import { FakeEmailValidator } from '@fakes/validators/email.fake.validator';
import { FakePasswordValidator } from '@fakes/validators/password.fake.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { HttpStatusCode } from '@shared/utils/http-status-code';

import { CreateUserController } from '../create-user.controller';

let createUserController: IController;
let createUserUseCase: ICreateUserUsecase;
let createUserValidator: ICreateUserValidator;
let fakeUsersRepository: ICreateUserRepository & IFindEmailUserRepository;
let fakePasswordEncryption: IPasswordEncryption;
let fakeUuidGenerator: IUuidGenerator;
let fakeEmailValidator: IEmailValidator;
let fakePasswordValidator: IPasswordValidator;
let requiredFieldsValidator: IRequiredFieldsValidator;

describe('CreateUserController', () => {
  beforeEach(() => {
    fakeUuidGenerator = new FakeUuidGenerator();
    requiredFieldsValidator = new RequiredFieldsValidator();
    fakePasswordEncryption = new FakePasswordEncryption();
    fakeEmailValidator = new FakeEmailValidator();
    fakePasswordValidator = new FakePasswordValidator();
    fakeUsersRepository = new FakeUserRepository(fakeUuidGenerator);
    createUserUseCase = new CreateUserUsecase(
      fakeUsersRepository,
      fakePasswordEncryption,
    );
    createUserValidator = new CreateUserValidator(
      requiredFieldsValidator,
      fakeUsersRepository,
      fakeEmailValidator,
      fakePasswordValidator,
    );
    createUserController = new CreateUserController(
      createUserUseCase,
      createUserValidator,
    );
  });

  it('should be able to create user', async () => {
    const user = await createUserController.handle({
      body: {
        name: 'Rita Marlene Gabrielly Cardoso',
        email: 'gabriellycardoso@heineken.com.br',
        password: '3k8EG923iA',
      },
    });
    expect(user.body).toHaveProperty('id');
    expect(user.statusCode).toBe(HttpStatusCode.CREATED);
  });

  it('should not be able to create user with invalid email', async () => {
    const user = await createUserController.handle({
      body: {
        name: 'Rita Marlene Gabrielly Cardoso',
        email: 'invalidEmail', // ? invalid email
        password: '3k8EG923iA',
      },
    });
    expect(user.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should not be able to create user with invalid password', async () => {
    const user = await createUserController.handle({
      body: {
        name: 'Rita Marlene Gabrielly Cardoso',
        email: 'gabriellycardoso@heineken.com.br',
        password: '22', // ? invalid password
      },
    });
    expect(user.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should not be able to create user with duplicated email', async () => {
    await fakeUsersRepository.create({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken.com.br',
      password: '3k8EG923iA',
    });

    const user = await createUserController.handle({
      body: {
        name: 'Natália Luna Kamilly Monteiro',
        email: 'gabriellycardoso@heineken.com.br',
        password: 'tOUfB8QdEU',
      },
    });
    expect(user.statusCode).toBe(HttpStatusCode.CONFLICT);
  });

  it('should not be able to create user with fields null', async () => {
    const user = await createUserController.handle({
      body: { name: 'Natália Luna Kamilly Monteiro' },
    });
    expect(user.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
});
