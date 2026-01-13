import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('api/users');
  }
}
