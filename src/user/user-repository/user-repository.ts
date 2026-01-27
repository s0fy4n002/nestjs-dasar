import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {   
    constructor(private readonly prismaService : PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger){
        console.log('created user repository')
    }

    async save(firstName:string, lastName:string){
        
        const created = await this.prismaService.users.create({
            data: {
                first_name: firstName,
                last_name: lastName
            }
        })
        this.logger.info('created user '+ JSON.stringify(created))
        return created
    }
}