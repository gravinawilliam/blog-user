import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeormConfig from '../../config/typeorm.config';
import { CreateUserRoute } from '../users/routes/create-user.route';
import { CreateUserModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    CreateUserModule,
  ],
  controllers: [CreateUserRoute],
  providers: [],
})
export class AppModule {}
