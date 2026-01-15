import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot(
    {
      isGlobal: true, // Global access
      envFilePath: '.env', // Explicit path
    }
  ), PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
