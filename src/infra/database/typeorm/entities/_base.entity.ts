import { BaseModel } from '../../../../domain/models/_base.model';
import {
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import * as uuid from 'uuid';

export class BaseEntity implements BaseModel {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid.v4();
    }
  }
}
