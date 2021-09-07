import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';
import * as uuid from 'uuid';

export class UuidGenerator implements IUuidGenerator {
  generate(): string {
    return uuid.v4();
  }
}
