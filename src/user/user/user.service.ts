import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getAll() {

    }

    sayHello(name: string) {
        if (!name) {
            return `tidak ada nama`
        }
        
        return `nama adalah ${name}`
    }
}
