import { Entity, Column, OneToMany } from 'typeorm';

import { UserModel } from '@models/user.model';

import { BaseEntity } from './_base.entity';
import { UserAccessLogEntity } from './user-access-log.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserModel {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @OneToMany(() => UserAccessLogEntity, accessLog => accessLog.user)
  logsAccess: UserAccessLogEntity[];
}
