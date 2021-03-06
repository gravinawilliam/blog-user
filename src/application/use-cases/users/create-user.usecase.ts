import { IUserDataReplication } from '@domain/providers/data-replications/users/user-data-replication.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { ICreateUserUseCase } from '@domain/use-cases/users/create-user.usecase';

import { ICreateUserResponseDTO } from '@dtos/users/create-user-response.dto';
import { IParamsCreateUserUseCaseDTO } from '@dtos/users/create-user.dto';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: ICreateUserRepository,
    private readonly dataReplications: IUserDataReplication,
  ) {}

  public async execute({
    email,
    name,
    password,
  }: IParamsCreateUserUseCaseDTO): Promise<ICreateUserResponseDTO> {
    const userCreated = await this.userRepository.create({
      password,
      email,
      name,
    });

    this.dataReplications.user({
      type: 'create',
      user: userCreated,
    });

    return {
      createdAt: userCreated.createdAt,
      email: userCreated.email,
      id: userCreated.id,
      name: userCreated.name,
    };
  }
}
