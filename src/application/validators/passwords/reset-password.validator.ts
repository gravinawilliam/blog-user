import { IFindByEmailTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/find-by-email-token-forgot-password.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IResetPasswordValidator } from '@domain/validators/passwords/reset-password.validator';

import { ResetPasswordValidatorDTO } from '@dtos/passwords/reset-password.dto';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { left, right } from '@shared/utils/either';
import { notFound } from '@shared/utils/http-response';

export class ResetPasswordValidator implements IResetPasswordValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly usersRepository: IFindEmailUserRepository,
    private readonly tokensForgotPasswordRepository: IFindByEmailTokenForgotPasswordRepository,
  ) {}

  async execute({
    email,
    newPassword,
    token,
  }: ResetPasswordValidatorDTO.Params): Promise<ResetPasswordValidatorDTO.Result> {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [email, newPassword, token],
      fieldNames: ['email', 'new_password', 'token'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const messageError = 'token forgot password';

    const tokenForgotPasswordExists =
      await this.tokensForgotPasswordRepository.findByEmail({
        email,
      });

    if (tokenForgotPasswordExists.isLeft()) {
      return left(notFound(new NotFoundModelError(messageError)));
    }

    const { tokenForgotPassword } = tokenForgotPasswordExists.value;

    if (tokenForgotPassword.token !== token) {
      return left(notFound(new NotFoundModelError(messageError)));
    }

    const user = await this.usersRepository.findEmail(email);

    if (user === undefined) {
      return left(notFound(new NotFoundModelError(messageError)));
    }

    if (user.id !== tokenForgotPassword.userId) {
      return left(notFound(new NotFoundModelError(messageError)));
    }

    return right({ user });
  }
}
