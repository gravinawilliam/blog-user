import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import { IPasswordValidator } from '@domain/validators/_shared/password.validator';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ICreateUserValidator } from '@domain/validators/users/create-user.validator';

import { ICreateUserDTO } from '@dtos/users/create-user.dto';

import { ConflictParamError } from '@shared/errors/conflict-param.error';
import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest, conflict } from '@shared/utils/http-response';

export class CreateUserValidator implements ICreateUserValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly usersRepository: IFindEmailUserRepository,
    private readonly emailValidator: IEmailValidator,
    private readonly passwordValidator: IPasswordValidator,
  ) {}

  public async execute({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<Either<IHttpResponse, boolean>> {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [email, name, password],
      fieldNames: ['email', 'name', 'password'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const isPasswordValid = this.passwordValidator.validatePassword(password);
    if (isPasswordValid.isLeft()) return left(isPasswordValid.value);

    const isEmailValid = this.emailValidator.isEmailValid(email);
    if (!isEmailValid) {
      return left(badRequest(new InvalidParamError('email')));
    }

    const emailExists = await this.usersRepository.findEmail(email);
    if (emailExists) return left(conflict(new ConflictParamError('email')));

    return right(true);
  }
}
