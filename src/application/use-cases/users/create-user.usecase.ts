import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';
import { ICreateUserRepository } from '@domain/repositories/users/create-user.repository';
import { ICreateUserUsecase } from '@domain/use-cases/users/create-user.usecase';
import { ICreateUserResponseDTO } from '@dtos/users/create-user-response.dto';
import { ICreateUserDTO } from '@dtos/users/create-user.dto';

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private readonly userRepository: ICreateUserRepository,
    private readonly passwordEncryption: IPasswordEncryption,
  ) {}

  public async execute({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<ICreateUserResponseDTO> {
    const passwordHashed = await this.passwordEncryption.encrypt(password);

    const userCreated = await this.userRepository.create({
      password: passwordHashed,
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
