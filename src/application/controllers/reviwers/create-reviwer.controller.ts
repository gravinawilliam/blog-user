import { ICreateReviwerUseCase } from '@domain/use-cases/reviwers/create-reviwer.usecase';
import { ICreateReviwerValidator } from '@domain/validators/reviwers/create-reviwer.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class CreateReviwerController implements IController {
  constructor(
    private readonly ceateReviwerUseCase: ICreateReviwerUseCase,
    private readonly createReviwerValidator: ICreateReviwerValidator,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;

    const reviwerValidated = await this.createReviwerValidator.execute({
      authorization,
    });
    if (reviwerValidated.isLeft()) return reviwerValidated.value;

    const { userId } = reviwerValidated.value;

    const reviwer = await this.ceateReviwerUseCase.execute({
      userId,
      reviwerStatus: 'pending',
    });

    return ok(reviwer);
  }
}
