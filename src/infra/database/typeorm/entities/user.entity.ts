import { UserModel } from '@/src/domain/models/user.model';
import { Entity, Column } from 'typeorm';
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
