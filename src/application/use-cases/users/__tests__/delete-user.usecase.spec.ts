import { IUserDataReplication } from '@domain/providers/data-replications/users/user-data-replication.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IDeleteUserUseCase } from '@domain/use-cases/users/delete-user.usecase';

import { FakeUserRepository } from '@fakes/database/repositories/users-fake.repository';
import { FakeUuidGenerator } from '@fakes/providers/uuid/uuid-generator.fake.provider';
import { FakeDataReplicationsRepository } from '@fakes/replications/replications.repository';

import { DeleteUserUseCase } from '../delete-user.usecase';

let deleteUserUseCase: IDeleteUserUseCase;
let fakeUsersRepository: IDeleteUserRepository & ICreateUserRepository;
let fakeUuidGenerator: FakeUuidGenerator;
let fakeDataReplications: IUserDataReplication;

describe('DeleteUserUseCase', () => {
  beforeEach(() => {
    fakeUuidGenerator = new FakeUuidGenerator();
    fakeUsersRepository = new FakeUserRepository(fakeUuidGenerator);
    fakeDataReplications = new FakeDataReplicationsRepository();
    deleteUserUseCase = new DeleteUserUseCase(
      fakeUsersRepository,
      fakeDataReplications,
    );
  });

  it('should be able to delete user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken.com.br',
      password: '3k8EG923iA',
    });
    await deleteUserUseCase.execute({
      user,
    });
  });
});
