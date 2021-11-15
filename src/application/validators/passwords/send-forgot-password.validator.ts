import { IDeleteTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/delete-token-forgot-password.repository';
import { IFindByUserIdTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/find-by-user-id-token-forgot-password.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IDateExpiredValidator } from '@domain/validators/_shared/date.validator';
import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ISendForgotPasswordValidator } from '@domain/validators/passwords/send-forgot-password.validator';

import { SendForgotPasswordValidatorDTO } from '@dtos/passwords/send-forgot-password.dto';

import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { left, right } from '@shared/utils/either';
import { badRequest, notFound } from '@shared/utils/http-response';

export class SendForgotPasswordValidator
  implements ISendForgotPasswordValidator
{
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly usersRepository: IFindEmailUserRepository,
    private readonly tokensForgotPasswordRepository: IFindByUserIdTokenForgotPasswordRepository &
      IDeleteTokenForgotPasswordRepository,
    private readonly emailValidator: IEmailValidator,
    private readonly dateProvider: IDateExpiredValidator,
  ) {}

  async execute({
    email,
  }: SendForgotPasswordValidatorDTO.Params): Promise<SendForgotPasswordValidatorDTO.Result> {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [email],
      fieldNames: ['email'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const isEmailValid = this.emailValidator.isEmailValid(email);
    if (!isEmailValid) return left(badRequest(new InvalidParamError('email')));

    const user = await this.usersRepository.findEmail(email);
    if (!user) return left(notFound(new NotFoundModelError('user')));

    const tokenForgotPasswordExists =
      await this.tokensForgotPasswordRepository.findByUserId({
        userId: user.id,
      });

    if (tokenForgotPasswordExists.isRight()) {
      const { tokenForgotPassword } = tokenForgotPasswordExists.value;
      const { expired } = this.dateProvider.expired({
        date: tokenForgotPassword.createdAt,
        expiresAfterMilliseconds: 120000,
      });
      if (expired === false) {
        return left(
          badRequest(
            new Error('wait a while to retry sending the token via email'),
          ),
        );
      }
      await this.tokensForgotPasswordRepository.delete({
        tokenForgotPassword,
      });
    }

    return right({
      user,
    });
  }
}
