import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';
import { IFindByIdUserRepository } from '@domain/repositories/users/find-by-id-user.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IDeleteUserValidator } from '@domain/validators/users/delete-user.validator';

import { IDeleteUserValidatorResponseDTO } from '@dtos/users/delete-user-validator-response.dto';
import { IDeleteUserDTO } from '@dtos/users/delete-user.dto';

import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest, notFound } from '@shared/utils/http-response';

export class DeleteUserValidator implements IDeleteUserValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly usersRepository: IFindByIdUserRepository,
    private readonly comparePasswordEncrypted: IComparePasswordEncrypted,
  ) {}

  public async execute({
    userId,
    password,
  }: IDeleteUserDTO): Promise<
    Either<IHttpResponse, IDeleteUserValidatorResponseDTO>
  > {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [userId, password],
      fieldNames: ['userId', 'password'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const user = await this.usersRepository.findById(userId);
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
      return left(badRequest(new InvalidParamError('password')));
    }

    return right({
      id: user.id,
    } as IDeleteUserValidatorResponseDTO);
  }
}
