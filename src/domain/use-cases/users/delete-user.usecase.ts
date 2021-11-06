import { IDeleteUserValidatorResponseDTO } from '@dtos/users/delete-user-validator-response.dto';

export interface IDeleteUserUseCase {
  execute(data: IDeleteUserValidatorResponseDTO): Promise<void>;
}
