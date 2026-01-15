import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: "localhost",
      port: 3306,
      connectionLimit: 5,
      user:'root',
      database: 'nestjs_dasar'
    })

    super({adapter})
  }


}
