import validator from 'validator';

import { IEmailValidator } from '@domain/validators/_shared/email.validator';

export class EmailValidator implements IEmailValidator {
  isEmailValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
