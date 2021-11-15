import { TokenCodeProviderDTO } from '@dtos/providers/tokens/token-code-provider.dto';

export interface IGenerateTokenCodeProvider {
  generateCode(): TokenCodeProviderDTO.Result;
}
