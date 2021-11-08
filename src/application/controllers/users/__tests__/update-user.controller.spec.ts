import { UpdateUserController } from '@application/controllers/users/update-user.controller';
import { UpdateUserTransformer } from '@application/transformers/users/update-user.transformer';
import { UpdateUserUseCase } from '@application/use-cases/users/update-user.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { UpdateUserValidator } from '@application/validators/users/update-user.validator';

import { IUpdateUserDataReplicationProvider } from '@domain/providers/data-replications/users/update-user-data-replication.provider';
import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';
import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';
import { ITokenGenerator } from '@domain/providers/token/token-generator.provider';
import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IFindByIdUserRepository } from '@domain/repositories/users/find-by-id-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IUpdateUserRepository } from '@domain/repositories/users/update-user.repository';
import { IUpdateUserTransformer } from '@domain/transformers/users/update-user.transformer';
import { IUpdateUserUseCase } from '@domain/use-cases/users/update-user.usecase';
import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import { IPasswordValidator } from '@domain/validators/_shared/password.validator';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IUpdateUserValidator } from '@domain/validators/users/update-user.validator';

import { FakeUserRepository } from '@fakes/database/repositories/users-fake.repository';
import { FakeComparePasswordEncrypted } from '@fakes/providers/encryption/compare-password-encrypted.fake.provider';
import { FakePasswordEncryption } from '@fakes/providers/encryption/password-encryption.fake.provider';
import { FakeTokenJwt } from '@fakes/providers/token/fake-token-jwt.provider';
import { FakeUuidGenerator } from '@fakes/providers/uuid/uuid-generator.fake.provider';
import { FakeDataReplicationsRepository } from '@fakes/replications/replications.repository';
import { FakeEmailValidator } from '@fakes/validators/email.fake.validator';
import { FakePasswordValidator } from '@fakes/validators/password.fake.validator';

import { HttpStatusCode } from '@shared/utils/http-status-code';

let fakeUsersRepository: IUpdateUserRepository &
  IFindEmailUserRepository &
  IFindByIdUserRepository &
  ICreateUserRepository;
let fakeUuidGenerator: IUuidGenerator;
let requiredFieldsValidator: IRequiredFieldsValidator;
let updateUserUseCase: IUpdateUserUseCase;
let updateUserValidator: IUpdateUserValidator;
let updateUserController: UpdateUserController;
let comparePasswordEncrypted: IComparePasswordEncrypted;
let tokenProvider: ITokenVerify & ITokenGenerator;
let fakeEmailValidator: IEmailValidator;
let fakeReplicationsRepository: IUpdateUserDataReplicationProvider;
let fakePasswordValidator: IPasswordValidator;
let updateUserTransformer: IUpdateUserTransformer;
let fakePasswordEncryption: IPasswordEncryption;

describe('UpdateUserController', () => {
  beforeEach(() => {
    requiredFieldsValidator = new RequiredFieldsValidator();
    fakeUuidGenerator = new FakeUuidGenerator();
    fakeEmailValidator = new FakeEmailValidator();
    fakeUsersRepository = new FakeUserRepository(fakeUuidGenerator);
    fakeReplicationsRepository = new FakeDataReplicationsRepository();
    comparePasswordEncrypted = new FakeComparePasswordEncrypted();
    tokenProvider = new FakeTokenJwt();
    updateUserUseCase = new UpdateUserUseCase(
      fakeUsersRepository,
      fakeReplicationsRepository,
    );
    fakePasswordValidator = new FakePasswordValidator();
    updateUserValidator = new UpdateUserValidator(
      requiredFieldsValidator,
      fakeUsersRepository,
      comparePasswordEncrypted,
      tokenProvider,
      fakeEmailValidator,
      fakePasswordValidator,
    );
    fakePasswordEncryption = new FakePasswordEncryption();
    updateUserTransformer = new UpdateUserTransformer(fakePasswordEncryption);
    updateUserController = new UpdateUserController(
      updateUserValidator,
      updateUserTransformer,
      updateUserUseCase,
    );
  });

  it('should be able to update user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken.com.br',
      password: '3k8EG923iA',
    });

    const updated = await updateUserController.handle({
      headers: {
        authorization: `Bearer ${user.id}`,
      },
      body: {
        name: 'Rita Marlene Gabrielly',
        email: 'gabriellycardoso@google.com.br',
        current_password: '3k8EG923iA',
        new_password: '4k2CHJ24131iA',
      },
    });
    expect(updated.body.email).toBe('gabriellycardoso@google.com.br');
    expect(updated.body.name).toBe('Rita Marlene Gabrielly');
    expect(updated.statusCode).toBe(HttpStatusCode.OK);
  });
});
