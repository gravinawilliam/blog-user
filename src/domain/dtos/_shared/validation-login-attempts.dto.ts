export type IRequestValidationLoginAttempts = {
  userId: string;
  conditionsTimeAttempts: any;
  tryLimit: number;
};

export type IResquestFindByUserIdUserAccessLog = {
  userId: string;
  authenticated: boolean;
};

export type IRequestCreateUserAccessLogDTO = {
  userId: string;
};
