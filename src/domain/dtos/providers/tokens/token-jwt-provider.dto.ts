export type ITokenJwtPayloadDTO = {
  iat: number;
  exp: number;
  sub: string;
};

export type IRequestTokenJwtVerify = {
  authorization: string;
};

export type IResponseTokenJwtVerify = {
  userId: string;
};
