import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { ReviwerModel } from '@models/reviwer.model';

import { BaseEntity } from './_base.entity';
import { UserEntity } from './user.entity';

@Entity('reviwers')
export class ReviwerEntity extends BaseEntity implements ReviwerModel {
  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'reviwer_status',
  })
  reviwerStatus: string;

  @OneToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;
}
