import { IDeleteUserValidatorResponseDTO } from '@dtos/users/delete-user-validator-response.dto';

export interface IDeleteUserUsecase {
  execute(data: IDeleteUserValidatorResponseDTO): Promise<void>;
}
