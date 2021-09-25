import { IDeleteUserValidatorResponseDTO } from '@domain/dtos/users/delete-user-validator-response.dto';
import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IDeleteUserUsecase } from '@domain/use-cases/users/delete-user.usecase';

export class DeleteUserUsecase implements IDeleteUserUsecase {
  constructor(private readonly userRepository: IDeleteUserRepository) {}

  public async execute({ id }: IDeleteUserValidatorResponseDTO): Promise<void> {
    await this.userRepository.delete(id);
  }
}
