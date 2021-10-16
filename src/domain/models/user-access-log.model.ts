import { BaseModel } from '@models/_base.model';

export class UserAccessLogModel extends BaseModel {
  userId: string;

  authenticated: boolean;
}
