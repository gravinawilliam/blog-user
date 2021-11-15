import { ServerError } from '@shared/errors/internal-server.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { HttpStatusCode } from '@shared/utils/http-status-code';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error,
});

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: new ServerError(error.stack),
});

export const created = (data: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.CREATED,
  body: data,
});

export const ok = (data?: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: data,
});

export const deleted = (data?: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: data,
});

export const conflict = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.CONFLICT,
  body: error,
});

export const notFound = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.NOT_FOUND,
  body: error,
});

export const unauthorized = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.UNAUTHORIZED,
  body: error,
});
