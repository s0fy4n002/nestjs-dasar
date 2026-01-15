import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class MemberService {
    constructor(private readonly moduleRef: ModuleRef){}

    getConnection(){
        const connection = this.moduleRef.get("StringConnection", {strict: false});
        console.log(`connection name adalah ${connection.getName()}`)
    }


    
    // constructor(private readonly connection :Connection){}

    // run(){
    //     let dbName = this.connection.getName();
    //     console.log('member service running');
    //     console.log('database name ', dbName);
    // }
    
}
