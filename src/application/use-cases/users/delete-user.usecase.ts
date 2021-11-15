import { IUserDataReplication } from '@domain/providers/data-replications/users/user-data-replication.provider';
import { IDeleteUserRepository } from '@domain/repositories/users/delete-user.repository';
import { IDeleteUserUseCase } from '@domain/use-cases/users/delete-user.usecase';

import { IDeleteUserValidatorResponseDTO } from '@dtos/users/delete-user-validator-response.dto';

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    private readonly userRepository: IDeleteUserRepository,
    private readonly dataReplications: IUserDataReplication,
  ) {}

  public async execute({
    user,
  }: IDeleteUserValidatorResponseDTO): Promise<void> {
    const userDeleted = await this.userRepository.delete(user);
    this.dataReplications.user({
      type: 'update',
      user: userDeleted,
    });
  }
}
