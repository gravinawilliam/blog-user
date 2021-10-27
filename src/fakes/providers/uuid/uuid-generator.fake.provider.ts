import { IUuidGenerator } from '@domain/providers/uuidGenerator/uuid-generator.provider';

export class FakeUuidGenerator implements IUuidGenerator {
  generate(): string {
    return Math.random().toString();
  }
}
