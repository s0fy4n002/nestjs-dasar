import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService:UserService) {}

  @Get()
  @Render('index')
  getHello() {

    let users = [
      { name: 'Andi', age: 25 },
      { name: 'Budi', age: 30 },
      { name: 'Citra', age: 28 },
    ];

    console.log(this.userService.sayHello('testName'));
     return { message: 'data message', users: users};
  }
}
