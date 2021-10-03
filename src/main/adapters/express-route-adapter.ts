import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { HttpStatusCode } from '@shared/utils/http-status-code';

export const adapterRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body,
      params: request.params,
      headers: request.headers,
    };

    const { body, statusCode } = await controller.handle(httpRequest);
    if (statusCode >= HttpStatusCode.OK && statusCode <= 299) {
      response.status(statusCode).json(body);
    } else {
      response.status(statusCode).json({
        error: body.message,
      });
    }
  };
};
