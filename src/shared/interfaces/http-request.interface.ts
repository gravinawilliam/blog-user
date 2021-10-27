type IHeaders = {
  [key: string]: unknown;
};

export interface IHttpRequest {
  body?: any;
  params?: any;
  headers?: IHeaders;
}
