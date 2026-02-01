import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { WinstonModule } from 'nest-winston';
import { ValidationModule } from './validation/validation.module';
import * as winston from 'winston'
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role/role.guard';

@Module({
  imports: [UserModule, ConfigModule.forRoot(
    {
      isGlobal: true, // Global access
      envFilePath: '.env', // Explicit path
    }
  ),
   WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()]
  }), PrismaModule, ValidationModule.forRoot(true)],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: RoleGuard}],
})
export class AppModule {}
