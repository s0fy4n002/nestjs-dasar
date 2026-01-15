import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';

export class UserRepository {   
    connection: Connection;

    save(){
        console.info(`save user with connection ${this.connection.getName()}`)
    }
}

export function createUserRepository(connection: Connection): UserRepository{
    const reposotory = new UserRepository();
    reposotory.connection = connection;
    return reposotory;
}