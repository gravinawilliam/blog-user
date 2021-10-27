import {
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import * as uuid from 'uuid';

import { BaseModel } from '@models/_base.model';

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
