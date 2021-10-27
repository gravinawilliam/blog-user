import { ICreateUserDataReplication } from '@domain/providers/data-replications/users/create-user-data-replication.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { ICreateUserUsecase } from '@domain/use-cases/users/create-user.usecase';

import { ICreateUserResponseDTO } from '@dtos/users/create-user-response.dto';
import { IParamsCreateUserUseCaseDTO } from '@dtos/users/create-user.dto';

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private readonly userRepository: ICreateUserRepository,
    private readonly dataReplications: ICreateUserDataReplication,
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

    this.dataReplications.createUser(userCreated);

    return userCreated;
  }
}
