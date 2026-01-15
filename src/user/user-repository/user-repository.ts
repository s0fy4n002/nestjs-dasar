import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {   
    constructor(private readonly prismaService : PrismaService){
        console.log('created user repository')
    }

    async save(firstName:string, lastName:string){
        
        const created = await this.prismaService.employee.create({
            data: {
                first_name: firstName,
                last_name: lastName
            }
        })

        console.info(`berhasil : ${created}`)
        console.info(`user berhasil disimpan`)
    }
}