import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {   
    constructor(private readonly prismaService : PrismaService){
        console.log('created user repository')
    }

    async save(firstName:string, lastName:string){
        
        const created = await this.prismaService.users.create({
            data: {
                first_name: firstName,
                last_name: lastName
            }
        })
        Object.entries(created).forEach(i=> {
            console.log('items '+i)
        })
        return created
    }
}