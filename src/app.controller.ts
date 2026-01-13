import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {

    let users = [
      { name: 'Andi', age: 25 },
      { name: 'Budi', age: 30 },
      { name: 'Citra', age: 28 },
    ];

     return { message: 'data message', users: users};
  }
}
