import { uid } from 'rand-token';

import { IGenerateTokenCodeProvider } from '@domain/providers/token/code/token-code-generator.provider';

import { TokenCodeProviderDTO } from '@dtos/providers/tokens/token-code-provider.dto';

export class TokenCodeProvider implements IGenerateTokenCodeProvider {
  generateCode(): TokenCodeProviderDTO.Result {
    const quantityNumbers = 6;
    return {
      token: uid(quantityNumbers),
    };
  }
}
