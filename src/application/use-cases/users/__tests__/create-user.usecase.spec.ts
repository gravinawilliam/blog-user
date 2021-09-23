import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { ICreateUserUsecase } from '@domain/use-cases/users/create-user.usecase';

import { FakeUserRepository } from '@fakes/database/repositories/users.fake.repository';
import { FakeUuidGenerator } from '@fakes/providers/uuid/uuid-generator.fake.provider';

import { CreateUserUsecase } from '../create-user.usecase';

let createUserUseCase: ICreateUserUsecase;
let fakeUsersRepository: ICreateUserRepository;
let fakeUuidGenerator: FakeUuidGenerator;

describe('CreateUserUsecase', () => {
  beforeEach(() => {
    fakeUuidGenerator = new FakeUuidGenerator();
    fakeUsersRepository = new FakeUserRepository(fakeUuidGenerator);
    createUserUseCase = new CreateUserUsecase(fakeUsersRepository);
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
