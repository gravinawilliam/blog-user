import { IUserDataReplication } from '@domain/providers/data-replications/users/user-data-replication.provider';
import { IUpdateUserRepository } from '@domain/repositories/users/update-user.repository';
import { IUpdateUserUseCase } from '@domain/use-cases/users/update-user.usecase';

import { UpdateUserUseCaseDTO } from '@dtos/users/update-user.dto';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly usersRepository: IUpdateUserRepository,
    private readonly dataReplications: IUserDataReplication,
  ) {}

  async execute({
    currentUser,
    email,
    name,
    newPassword,
  }: UpdateUserUseCaseDTO.Params): Promise<UpdateUserUseCaseDTO.Result> {
    const user = currentUser;

    if (email !== null) user.email = email;
    if (name !== null) user.name = name;
    if (newPassword !== null) user.password = newPassword;

    const updated = await this.usersRepository.update(user);

    this.dataReplications.user({
      type: 'update',
      user: updated,
    });

    return {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      updatedAt: updated.updatedAt,
    };
  }
}
