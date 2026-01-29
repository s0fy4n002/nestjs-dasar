import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import z from 'zod';

@Injectable()
export class UserService implements OnApplicationShutdown, OnModuleInit {

    onApplicationShutdown(signal: string) {
        console.log('onApplicationShutdown: ', signal); // e.g. "SIGINT"
    }

    onModuleInit() {
        console.log(`The module has been initialized.`);
    }

    constructor(private readonly validationService: ValidationService){

    }

    getAll() {

    }

    sayHello(name: string) {
        const schema = z.string().min(3).max(100);
        const result = this.validationService.validate(schema, name);
        return `hello ${result}`;
    }
}
