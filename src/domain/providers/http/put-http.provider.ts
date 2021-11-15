import {
  IParamsPostHttpDTO,
  IResponseHttpResponseDTO,
} from '@dtos/providers/http/http-provider.dto';

export interface IPutHttp {
  put(params: IParamsPostHttpDTO): Promise<IResponseHttpResponseDTO>;
}
