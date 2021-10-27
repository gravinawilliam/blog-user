import validator from 'validator';

import { IEmailValidator } from '@domain/validators/_shared/email.validator';

export class EmailValidator implements IEmailValidator {
  async isEmailValid(email: string): Promise<boolean> {
    return validator.isEmail(email);
  }
}
