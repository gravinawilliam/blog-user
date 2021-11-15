export namespace DateExpiredValidatorDTO {
  export type Params = {
    date: Date;
    expiresAfterMilliseconds: number;
  };

  export type Result = {
    expired: boolean;
  };
}
