export interface IEmailValidator {
  isEmailValid(email: string): Promise<boolean>;
}
