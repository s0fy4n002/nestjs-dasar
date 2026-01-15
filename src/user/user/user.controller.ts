import { Controller, Get, Header, HttpCode, Inject, Ip, Param, Post, Query } from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common'

import type { Request, Response } from 'express';
import { type CookieDecoratorReturn, Cookies } from '../decorator/cookie.decorator';
import { UserService } from './user.service';
import { EmployeeService } from 'src/employee/employee/employee.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';

@Controller('/api/users')
export class UserController {

    constructor(private readonly userService: UserService, private readonly employeeService: EmployeeService, private readonly connection: Connection, private readonly mailService: MailService, private readonly userRepository :UserRepository, private readonly memberService :MemberService) {}

    

    @Post()
    post(): string {
        return 'POST method';
    }

    @Get()
    sayHello(@Query('name') name: string): string {
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

    @Get('/:id')
    findOne(@Param() params: any, request: Request): string {
        return `Method Get ${params.id}`;
    }


}
