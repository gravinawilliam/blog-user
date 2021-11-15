import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';
import { ITokenJwtVerify } from '@domain/providers/token/jwt/token-jwt-verify.provider';
import { IFindByIdUserRepository } from '@domain/repositories/users/find-by-id-user.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import { IPasswordValidator } from '@domain/validators/_shared/password.validator';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IUpdateUserValidator } from '@domain/validators/users/update-user.validator';

import { UpdateUserValidatorDTO } from '@dtos/users/update-user.dto';

import { ConflictParamError } from '@shared/errors/conflict-param.error';
import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest, conflict, notFound } from '@shared/utils/http-response';

export class UpdateUserValidator implements IUpdateUserValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly usersRepository: IFindByIdUserRepository &
      IFindEmailUserRepository,
    private readonly comparePasswordEncrypted: IComparePasswordEncrypted,
    private readonly tokenProvider: ITokenJwtVerify,
    private readonly emailValidator: IEmailValidator,
    private readonly passwordValidator: IPasswordValidator,
  ) {}

  async execute({
    authorization,
    email,
    currentPassword,
    newPassword,
  }: UpdateUserValidatorDTO.Params): Promise<
    Either<IHttpResponse, UpdateUserValidatorDTO.Result>
  > {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [currentPassword, authorization],
      fieldNames: ['current_password', 'token'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    if (newPassword !== null) {
      const isPasswordValid =
        this.passwordValidator.validatePassword(newPassword);
      if (isPasswordValid.isLeft()) return left(isPasswordValid.value);
    }

    const tokenValid = this.tokenProvider.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);
    const { userId } = tokenValid.value;
    const user = await this.usersRepository.findById(userId);
    if (user === undefined) {
      return left(notFound(new NotFoundModelError('user')));
    }

    const passwordMatched = await this.comparePasswordEncrypted.comparePassword(
      {
        password: currentPassword,
        hashed: user.password,
      },
    );
    if (passwordMatched === false) {
      return left(badRequest(new InvalidParamError('password')));
    }

    if (email !== null) {
      const isEmailValid = this.emailValidator.isEmailValid(email);
      if (!isEmailValid) {
        return left(badRequest(new InvalidParamError('email')));
      }
      const emailExists = await this.usersRepository.findEmail(email);
      if (emailExists && user.email !== email) {
        return left(conflict(new ConflictParamError('email')));
      }
    }

    return right({
      currentUser: user,
    });
  }
}
