import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserMiddleware } from './middleware/user.middleware';
import { UserService } from './user/user.service';
import { EmployeeService } from 'src/employee/employee/employee.service';
import { Connection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    EmployeeService,
    {
      provide: Connection,
      // useClass: process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection
      useFactory: (configService: ConfigService) => {
        const databaseType = configService.get<string>('DATABASE');

        return databaseType === 'mysql' 
          ? new MySQLConnection()
          : new MongoDBConnection();
      },
      inject: [ConfigService],
    }
  ]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('api/users');
  }
}
