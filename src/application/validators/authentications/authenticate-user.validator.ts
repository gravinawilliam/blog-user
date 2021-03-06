import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';
import { ICreateFailureUserAccessLogRepository } from '@domain/repositories/user-access-log/create-failure-user-access-log.repository';
import { ICreateSuccessUserAccessLogRepository } from '@domain/repositories/user-access-log/create-success-user-access-log.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IAuthenticateUserValidator } from '@domain/validators/authentications/authenticate-user.validator';

import { IAuthenticateUserValidatorResponseDTO } from '@dtos/authentications/authenticate-user-validator-response.dto';
import { IAuthenticateUserDTO } from '@dtos/authentications/authenticate-user.dto';

import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest, notFound } from '@shared/utils/http-response';

export class AuthenticateUserValidator implements IAuthenticateUserValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly usersRepository: IFindEmailUserRepository,
    private readonly emailValidator: IEmailValidator,
    private readonly comparePasswordEncrypted: IComparePasswordEncrypted,
    private readonly userAccessLogRepository: ICreateFailureUserAccessLogRepository &
      ICreateSuccessUserAccessLogRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<
    Either<IHttpResponse, IAuthenticateUserValidatorResponseDTO>
  > {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [email, password],
      fieldNames: ['email', 'password'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const isEmailValid = this.emailValidator.isEmailValid(email);
    if (!isEmailValid) {
      return left(badRequest(new InvalidParamError('email')));
    }

    const user = await this.usersRepository.findEmail(email);
    if (user === undefined) {
      return left(notFound(new NotFoundModelError('user')));
    }

    const passwordMatched = await this.comparePasswordEncrypted.comparePassword(
      {
        password,
        hashed: user.password,
      },
    );
    if (passwordMatched === false) {
      await this.userAccessLogRepository.createFailure({
        userId: user.id,
      });
      return left(badRequest(new InvalidParamError('password')));
    }

    await this.userAccessLogRepository.createSuccess({
      userId: user.id,
    });

    return right({
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      isReviewer: user.isReviewer,
    });
  }
}
