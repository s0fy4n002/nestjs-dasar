import { Controller, Get, Header, HostParam, HttpCode, Ip, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common'

import type { Request, Response } from 'express';
import { type CookieDecoratorReturn, Cookies } from '../decorator/cookie.decorator';

@Controller('/api/users')
export class UserController {
    @Post()
    post(): string {
        return 'POST method';
    }

    // @Get()
    // findAll(@Query('name') name: string, @Ip() ip:any, @HostParam() host:any):string{
    //     console.log('host: ',host)
    //     if(name){
    //         return `findAll get method IP: ${ip} name : ${name} hostParam: ${host}`
    //     }
    //     return `findAll get method ${ip} hostParam: ${host}`
    // }

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
