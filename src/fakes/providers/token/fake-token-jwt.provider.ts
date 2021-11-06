import { ITokenGenerator } from '@domain/providers/token/token-generator.provider';

export class FakeTokenJwt implements ITokenGenerator {
  generate(userId: string): string {
    return `Bearer ${userId}`;
  }
}
