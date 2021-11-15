import { SendForgotPasswordController } from '@application/controllers/passwords/send-forgot-password.controller';
import { SendForgotPasswordUseCase } from '@application/use-cases/passwords/send-forgot-password.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { SendForgotPasswordValidator } from '@application/validators/passwords/send-forgot-password.validator';

import { IPostHttp } from '@domain/providers/http/post-http.provider';
import { ISendEmailProvider } from '@domain/providers/send-email/send-email.provider';
import { IGenerateTokenCodeProvider } from '@domain/providers/token/code/token-code-generator.provider';
import { ICreateTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/create-token-forgot-password.repository';
import { IDeleteTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/delete-token-forgot-password.repository';
import { IFindByUserIdTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/find-by-user-id-token-forgot-password.repository';
import { IFindEmailUserRepository } from '@domain/repositories/users/find-email-user.repository';
import { ISendForgotPasswordUseCase } from '@domain/use-cases/passwords/send-forgot-password.usecase';
import { IDateExpiredValidator } from '@domain/validators/_shared/date.validator';
import { IEmailValidator } from '@domain/validators/_shared/email.validator';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ISendForgotPasswordValidator } from '@domain/validators/passwords/send-forgot-password.validator';

import TokensForgotPasswordTypeormRepository from '@infra/database/typeorm/repositories/tokens-forgot-password.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { DateFnsProvider } from '@infra/providers/date/date-fns.provider';
import { AxiosHttpProvider } from '@infra/providers/http/axios.provider';
import { SendEmailProvider } from '@infra/providers/send-email/send-email.provider';
import { TokenCodeProvider } from '@infra/providers/token/code/token-code-generator.provider';
import { EmailValidator } from '@infra/validators/email.validator';

import { IController } from '@shared/interfaces/controller.interface';

let sendForgotPasswordValidator: ISendForgotPasswordValidator;
let sendForgotPasswordUseCase: ISendForgotPasswordUseCase;
let requiredFieldsValidator: IRequiredFieldsValidator;
let usersRepository: IFindEmailUserRepository;
let emailValidator: IEmailValidator;
let generateTokenProvider: IGenerateTokenCodeProvider;
let sendEmailProvider: ISendEmailProvider;
let httpRequest: IPostHttp;
let dateProvider: IDateExpiredValidator;
let tokensForgotPasswordRepository: ICreateTokenForgotPasswordRepository &
  IDeleteTokenForgotPasswordRepository &
  IFindByUserIdTokenForgotPasswordRepository;

export const makeSendForgotPasswordController = (): IController => {
  requiredFieldsValidator = new RequiredFieldsValidator();
  usersRepository = new UsersTypeormRepository();
  emailValidator = new EmailValidator();
  generateTokenProvider = new TokenCodeProvider();
  httpRequest = new AxiosHttpProvider();
  dateProvider = new DateFnsProvider();
  sendEmailProvider = new SendEmailProvider(httpRequest);
  tokensForgotPasswordRepository = new TokensForgotPasswordTypeormRepository();
  sendForgotPasswordValidator = new SendForgotPasswordValidator(
    requiredFieldsValidator,
    usersRepository,
    tokensForgotPasswordRepository,
    emailValidator,
    dateProvider,
  );
  sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
    generateTokenProvider,
    sendEmailProvider,
    tokensForgotPasswordRepository,
  );
  return new SendForgotPasswordController(
    sendForgotPasswordValidator,
    sendForgotPasswordUseCase,
  );
};
