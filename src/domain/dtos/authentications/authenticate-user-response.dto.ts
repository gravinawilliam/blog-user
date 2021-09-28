import { IAuthenticateUserValidatorResponseDTO } from './authenticate-user-validator-response.dto';

export interface IAuthenticateUserResponseDTO {
  token: string;
  user: IAuthenticateUserValidatorResponseDTO;
}
