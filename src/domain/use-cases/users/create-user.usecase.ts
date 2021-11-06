import { ICreateUserResponseDTO } from '@dtos/users/create-user-response.dto';
import { IParamsCreateUserUseCaseDTO } from '@dtos/users/create-user.dto';

export interface ICreateUserUseCase {
  execute(params: IParamsCreateUserUseCaseDTO): Promise<ICreateUserResponseDTO>;
}
