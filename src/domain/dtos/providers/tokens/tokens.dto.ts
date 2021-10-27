export type ITokenPayloadDTO = {
  iat: number;
  exp: number;
  sub: string;
};

export type IRequestTokenVerify = {
  authorization: string;
};

export type IResponseTokenVerify = {
  userId: string;
};
