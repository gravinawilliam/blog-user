import { Module } from '@nestjs/common';

import { ResetPasswordRoute } from './routes/reset-password.route';
import { SendForgotPasswordRoute } from './routes/send-forgot-password.route';

@Module({
  controllers: [SendForgotPasswordRoute, ResetPasswordRoute],
  providers: [],
})
export class PasswordsModule {}
