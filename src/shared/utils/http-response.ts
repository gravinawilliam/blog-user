import { ServerError } from '@shared/errors/internal-server.error';
import { IHttpResponse } from '../interfaces/http-response.interface';
import { HttpStatusCode } from './http-status-code';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error,
});

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: new ServerError(error.stack),
});

export const created = (data: any): IHttpResponse => ({
  statusCode: HttpStatusCode.CREATED,
  body: data,
});

export const conflict = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.CONFLICT,
  body: error,
});
