export class NotFoundModelError extends Error {
  constructor(modelName: string) {
    super(`Not found model: ${modelName}`);
    this.name = 'NotFoundModelError';
  }
}
