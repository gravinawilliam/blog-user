import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IDeleteUserUseCase } from '@domain/use-cases/users/delete-user.usecase';

import { IDeleteUserValidatorResponseDTO } from '@dtos/users/delete-user-validator-response.dto';

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly userRepository: IDeleteUserRepository) {}

  public async execute({ id }: IDeleteUserValidatorResponseDTO): Promise<void> {
    await this.userRepository.delete(id);
  }
}
