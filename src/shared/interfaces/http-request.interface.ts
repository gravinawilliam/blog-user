type IHeaders = {
  [key: string]: unknown;
  authorization?: string;
};

export interface IHttpRequest {
  body?: any;
  params?: any;
  headers?: IHeaders;
}
