import { Module } from '@nestjs/common';

import { CreateReviwerController } from '@application/controllers/reviwers/create-reviwer.controller';

import { CreateReviwerRoute } from './routes/create-reviwer.route';

@Module({
  controllers: [CreateReviwerRoute],
  providers: [CreateReviwerController],
})
export class ReviwersModule {}
