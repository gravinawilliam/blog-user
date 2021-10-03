import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByUserIdReviwersRepository } from '@domain/repositories/reviwers/find-by-user-id-reviwers.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ICreateReviwerValidator } from '@domain/validators/reviwers/create-reviwer.validator';

import {
  IRequestCreateReviwerValidatorDTO,
  IResponseCreateReviwerValidatorDTO,
} from '@dtos/reviwers/create-reviwer.dto';

import { ConflictParamError } from '@shared/errors/conflict-param.error';
import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { conflict, badRequest } from '@shared/utils/http-response';

import { IFindByIdUserRepository } from '../../../domain/repositories/users/find-by-id-user.repository';

export class CreateReviwerValidator implements ICreateReviwerValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly reviwersRepository: IFindByUserIdReviwersRepository,
    private readonly usersRepository: IFindByIdUserRepository,
    private readonly token: ITokenVerify,
  ) {}

  public async execute({
    authorization,
  }: IRequestCreateReviwerValidatorDTO): Promise<
    Either<IHttpResponse, IResponseCreateReviwerValidatorDTO>
  > {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [authorization],
      fieldNames: ['authorization'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.token.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);

    const { userId } = tokenValid.value;

    const userExists = await this.usersRepository.findById(userId);
    if (userExists === undefined) {
      return left(badRequest(new NotFoundModelError('user')));
    }

    const userIdExists = await this.reviwersRepository.findByUserId(userId);
    if (userIdExists) return left(conflict(new ConflictParamError('user id')));

    return right({
      userId,
    });
  }
}
