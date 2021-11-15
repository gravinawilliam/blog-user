import { IUserDataReplication } from '@domain/providers/data-replications/users/user-data-replication.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { ICreateUserUseCase } from '@domain/use-cases/users/create-user.usecase';

import { FakeUserRepository } from '@fakes/database/repositories/users-fake.repository';
import { FakeUuidGenerator } from '@fakes/providers/uuid/uuid-generator.fake.provider';
import { FakeDataReplicationsRepository } from '@fakes/replications/replications.repository';

import { CreateUserUseCase } from '../create-user.usecase';

let createUserUseCase: ICreateUserUseCase;
let fakeUsersRepository: ICreateUserRepository;
let fakeDataReplications: IUserDataReplication;
let fakeUuidGenerator: FakeUuidGenerator;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    fakeUuidGenerator = new FakeUuidGenerator();
    fakeUsersRepository = new FakeUserRepository(fakeUuidGenerator);
    fakeDataReplications = new FakeDataReplicationsRepository();
    createUserUseCase = new CreateUserUseCase(
      fakeUsersRepository,
      fakeDataReplications,
    );
  });

  it('should be able to create user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken.com.br',
      password: '3k8EG923iA',
    });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Rita Marlene Gabrielly Cardoso');
  });
});
