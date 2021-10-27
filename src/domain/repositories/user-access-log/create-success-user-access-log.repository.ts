import { IRequestCreateUserAccessLogDTO } from '@dtos/_shared/validation-login-attempts.dto';

export interface ICreateSuccessUserAccessLogRepository {
  createSuccess(params: IRequestCreateUserAccessLogDTO): Promise<void>;
}
