export interface ITokenJwtGenerator {
  generate(userId: string): string;
}
