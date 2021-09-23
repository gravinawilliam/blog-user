import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { ICreateUserUsecase } from '@domain/use-cases/users/create-user.usecase';

import { ICreateUserResponseDTO } from '@dtos/users/create-user-response.dto';
import { ICreateUserDTO } from '@dtos/users/create-user.dto';

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  public async execute({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<ICreateUserResponseDTO> {
    const userCreated = await this.userRepository.create({
      password,
      email,
      name,
    });

    return {
      id: userCreated.id,
      email,
      name,
      createdAt: userCreated.createdAt,
    };
  }
}
