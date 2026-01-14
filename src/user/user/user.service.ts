import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UserService implements OnApplicationShutdown, OnModuleInit {

    onApplicationShutdown(signal: string) {
        console.log('onApplicationShutdown: ', signal); // e.g. "SIGINT"
    }

    onModuleInit() {
        console.log(`The module has been initialized.`);
    }

    getAll() {

    }

    sayHello(name: string) {
        if (!name) {
            return `tidak ada nama`
        }

        return `nama adalah ${name}`
    }
}
