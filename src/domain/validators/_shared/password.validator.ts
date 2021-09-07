import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface IPasswordValidator {
  validatePassword(password: string): Promise<Either<IHttpResponse, boolean>>;
}
