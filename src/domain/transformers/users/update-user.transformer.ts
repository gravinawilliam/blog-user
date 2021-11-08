import { UpdateUserTransformerDTO } from '@dtos/users/update-user.dto';

export interface IUpdateUserTransformer {
  execute(
    params: UpdateUserTransformerDTO.Params,
  ): Promise<UpdateUserTransformerDTO.Result>;
}
