import { Controller, Get, HostParam, Ip, Param, Post, Query, Redirect, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('/api/users')
export class UserController {
    @Post()
    post(): string{
        return 'POST method';
    }

    @Get()
    findAll(@Query('name') name: string, @Ip() ip:any, @HostParam() host:any):string{
        console.log('host: ',host)
        if(name){
            return `findAll get method IP: ${ip} name : ${name} hostParam: ${host}`
        }
        return `findAll get method ${ip} hostParam: ${host}`
    }


    @Get('/:id')
    findOne(@Param() params: any, request: Request): string{
        return `Method Get ${params.id}`;
    }

    
}
