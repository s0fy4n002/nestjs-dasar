import { Body, Controller, Get, Header, Headers, HttpCode, Inject, Ip, Param, ParseIntPipe, Post, Query, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common'

import type { Request, Response } from 'express';
import { type CookieDecoratorReturn, Cookies } from '../decorator/cookie.decorator';
import { UserService } from './user.service';
import { EmployeeService } from 'src/employee/employee/employee.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { ValidationFilter } from 'src/validation/validation.filter';
import { LoginUserRequest, loginUserRequestValidation } from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { TimeInterceptor } from 'src/time/time.interceptor';

@Controller('/api/users')
export class UserController {

    constructor(private readonly userService: UserService, private readonly employeeService: EmployeeService, private readonly connection: Connection, private readonly mailService: MailService, private readonly userRepository :UserRepository, private readonly memberService :MemberService) {}


    @Post('/create')
    async post(@Query('firstname') first_name: string, @Query('lastname') last_name: string): Promise<string> {
        let created = await this.userRepository.save(first_name, last_name);
        console.info(`berhasil : ${JSON.stringify(created)}`)
        console.info(`user berhasil disimpan`)
        return 'apakah berhasil:  '+JSON.stringify(created);
    }


    @Get('/hello')
    @UseFilters(ValidationFilter)
    sayHello(@Query('name') name: string): string {
        return this.userService.sayHello(name);
    }

    @Get()
    getHello(@Query('name') name: string): string {
        return this.employeeService.getData()
    }


    @Get()
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async findAll(@Cookies('name') cookie: CookieDecoratorReturn, @Ip() ip: any): Promise<Record<string, any>> {
        // Set / update cookie
        cookie.setCookie('auth-nestjs', 'yansCookie', {
            httpOnly: true,
            maxAge: 3600 * 1000, // 1 jam
            secure: false,       // ubah ke true kalau HTTPS
            path: '/',
            sameSite: 'strict',
        });

        let resData = { ip, message: 'berhasil edit testing' };
        return resData
    }


    @Get('/connection')
    getConnection() {
        this.userRepository.save('Muahmmad', 'sofyansyah');
        console.log('save user')
        return this.connection.getName();
    }

    @Get('/redirect')
    redirect(): HttpRedirectResponse {
        return {
            'url': '/',
            'statusCode': 307
        }
    }

    // @Get('/:name')
    // findName(@Param() params: any, request: Request): string {
    //     return `params findName ${params.name}`;
    // }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: any, request: Request): string {
        return `Method Get diakses ${id}`;
    }

    @UseFilters(ValidationFilter)
    @UsePipes(new ValidationPipe(loginUserRequestValidation))
    @UseInterceptors(TimeInterceptor)
    @Post('/login')
    @Header('Content-Type', 'application/json')
    async login(@Query('name') name:string,  @Body() request: LoginUserRequest): Promise<any> {
       return {
        data: `hello ${request.username}`
       }
    }


}
