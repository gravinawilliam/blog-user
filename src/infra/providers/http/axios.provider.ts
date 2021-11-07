import axios from 'axios';

import { IPostHttp } from '@domain/providers/http/post-http.provider';
import { IPutHttp } from '@domain/providers/http/put-http.provider';

import {
  IParamsPostHttpDTO,
  IResponseHttpResponseDTO,
} from '@dtos/providers/http/http-provider.dto';

export class AxiosHttpProvider implements IPostHttp, IPutHttp {
  public async post({
    data,
    url,
  }: IParamsPostHttpDTO): Promise<IResponseHttpResponseDTO> {
    try {
      return await axios.post(url, data);
    } catch (error) {
      // TODO: adicionar aqui o envio do erro para o serviço de log
      console.log(error);
      return {
        response: error.response,
      };
    }
  }

  public async put({
    data,
    url,
  }: IParamsPostHttpDTO): Promise<IResponseHttpResponseDTO> {
    try {
      return await axios.put(url, data);
    } catch (error) {
      // TODO: adicionar aqui o envio do erro para o serviço de log
      console.log(error);
      return {
        response: error.response,
      };
    }
  }
}
