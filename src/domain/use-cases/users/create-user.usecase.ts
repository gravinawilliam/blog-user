import { ICreateUserResponseDTO } from '@dtos/users/create-user-response.dto';
import { ICreateUserDTO } from '@dtos/users/create-user.dto';

export interface ICreateUserUsecase {
  execute(createOwner: ICreateUserDTO): Promise<ICreateUserResponseDTO>;
}
