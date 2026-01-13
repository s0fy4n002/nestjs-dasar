import { Inject, Injectable, Scope  } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { type Request } from 'express';


@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getHello(): string {
    const cookieStore = this.request.cookies['auth-nestjs'] || 'no-cookie';
    console.log(this.request.cookies['auth-nestjs'])
    
    return `Hello World! cookie : ${cookieStore}`;
  }
}
