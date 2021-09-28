export interface ITokenJwtGenerator {
  jwt(userId: string): string;
}
