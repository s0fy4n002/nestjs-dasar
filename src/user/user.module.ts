import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserMiddleware } from './middleware/user.middleware';
import { UserService } from './user/user.service';
import { EmployeeService } from 'src/employee/employee/employee.service';
import { Connection, createConnection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { ConfigService } from '@nestjs/config';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    EmployeeService,
    {
      provide: Connection,
      // useClass: process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: 'StringConnection',
      useExisting: Connection
    },
    {
      provide: MailService,
      useValue: mailService
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection]
    },
    MemberService
  ]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('api/users');
  }
}
