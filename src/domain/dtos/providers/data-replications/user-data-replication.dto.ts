import { UserModel } from '../../../models/user.model';

export namespace UserDataReplicationDTO {
  export type Params = {
    user: UserModel;
    type: string;
  };

  export type Result = Promise<void>;
}
