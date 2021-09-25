import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IDeleteUserUsecase } from '@domain/use-cases/users/delete-user.usecase';

import { FakeUserRepository } from '@fakes/database/repositories/users.fake.repository';
import { FakeUuidGenerator } from '@fakes/providers/uuid/uuid-generator.fake.provider';

import { DeleteUserUsecase } from '../delete-user.usecase';

let deleteUserUseCase: IDeleteUserUsecase;
let fakeUsersRepository: IDeleteUserRepository & ICreateUserRepository;
let fakeUuidGenerator: FakeUuidGenerator;

describe('DeleteUserUsecase', () => {
  beforeEach(() => {
    fakeUuidGenerator = new FakeUuidGenerator();
    fakeUsersRepository = new FakeUserRepository(fakeUuidGenerator);
    deleteUserUseCase = new DeleteUserUsecase(fakeUsersRepository);
  });

  it('should be able to delete user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rita Marlene Gabrielly Cardoso',
      email: 'gabriellycardoso@heineken.com.br',
      password: '3k8EG923iA',
    });
    await deleteUserUseCase.execute({
      id: user.id,
    });
  });
});
