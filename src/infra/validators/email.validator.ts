import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import validator from 'validator';

export class EmailValidator implements IEmailValidator {
  async isEmailValid(email: string): Promise<boolean> {
    return validator.isEmail(email);
  }
}
