export type IRequestValidationLoginAttempts = {
  userId: string;
};

export type IRequestCreateUserAccessLogDTO = {
  userId: string;
};

export type IResponseValidationLoginAttemptsDTO = {
  numberAttempts: number;
};

export type IRequestDoubleCheckValidationLoginAttemptsDTO = {
  numberAttempts: number;
};
