import {
  IParamsPostHttpDTO,
  IResponseHttpResponseDTO,
} from '@dtos/providers/http/http-provider.dto';

export interface IPostHttp {
  post(params: IParamsPostHttpDTO): Promise<IResponseHttpResponseDTO>;
}
