import { UpdateUserUseCaseDTO } from '@dtos/users/update-user.dto';

export interface IUpdateUserUseCase {
  execute(
    params: UpdateUserUseCaseDTO.Params,
  ): Promise<UpdateUserUseCaseDTO.Result>;
}
