import { IEmailValidator } from '@domain/validators/_shared/email.validator';

export class FakeEmailValidator implements IEmailValidator {
  isEmailValid(email: string): boolean {
    return email.includes('@');
  }
}
