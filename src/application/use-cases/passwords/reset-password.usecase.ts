import { IUpdateUserRepository } from '@domain/repositories/users/update-user.repository';
import { IResetPasswordUseCase } from '@domain/use-cases/passwords/reset-password.usecase';

import { ResetPasswordUseCaseDTO } from '@dtos/passwords/reset-password.dto';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(private readonly usersRepository: IUpdateUserRepository) {}

  public async execute({
    passwordEncrypted,
    user,
  }: ResetPasswordUseCaseDTO.Params): Promise<void> {
    await this.usersRepository.update({
      ...user,
      password: passwordEncrypted,
    });
  }
}
