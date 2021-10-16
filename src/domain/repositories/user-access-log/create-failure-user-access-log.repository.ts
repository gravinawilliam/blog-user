import { IRequestCreateUserAccessLogDTO } from '@dtos/_shared/validation-login-attempts.dto';

export interface ICreateFailureUserAccessLogRepository {
  createFailure(params: IRequestCreateUserAccessLogDTO): Promise<void>;
}
