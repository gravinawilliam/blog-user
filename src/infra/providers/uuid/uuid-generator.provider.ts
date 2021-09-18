import * as uuid from 'uuid';

import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';

export class UuidGenerator implements IUuidGenerator {
  generate(): string {
    return uuid.v4();
  }
}
