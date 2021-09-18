import { Entity, Column } from 'typeorm';

import { UserModel } from '@models/user.model';

import { BaseEntity } from './_base.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserModel {
  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
  })
  password: string;
}
