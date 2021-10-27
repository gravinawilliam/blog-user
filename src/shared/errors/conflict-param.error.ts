export class ConflictParamError extends Error {
  constructor(paramName: string) {
    super(`Conflict param: ${paramName}`);
    this.name = 'ConflictParamError';
  }
}
