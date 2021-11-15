import { Column, Entity } from 'typeorm';

import { TokenForgotPasswordModel } from '@models/token-forgot-password.model';

import { BaseEntity } from './_base.entity';

@Entity('tokens_forgot_password')
export class TokenForgotPasswordEntity
  extends BaseEntity
  implements TokenForgotPasswordModel
{
  @Column()
  userId: string;

  @Column()
  token: string;

  @Column()
  email: string;
}
