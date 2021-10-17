import { Column, Entity, ManyToOne } from 'typeorm';

import { UserAccessLogModel } from '@models/user-access-log.model';

import { BaseEntity } from './_base.entity';
import { UserEntity } from './user.entity';

@Entity('user_access_logs')
export class UserAccessLogEntity
  extends BaseEntity
  implements UserAccessLogModel
{
  @Column()
  userId: string;

  @Column()
  authenticated: boolean;

  @ManyToOne(() => UserEntity, user => user.logsAccess)
  user: UserEntity;
}
