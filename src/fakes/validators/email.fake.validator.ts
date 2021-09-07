import { IEmailValidator } from '@domain/validators/_shared/email.validator';

export class FakeEmailValidator implements IEmailValidator {
  async isEmailValid(email: string): Promise<boolean> {
    return email.includes('@');
  }
}
