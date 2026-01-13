import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserMiddleware } from './middleware/user.middleware';
import { UserService } from './user/user.service';
import { EmployeeService } from 'src/employee/employee/employee.service';

@Module({
  controllers: [UserController],
  providers: [UserService, EmployeeService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('api/users');
  }
}
