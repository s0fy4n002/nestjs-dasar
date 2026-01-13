import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
    getData():string{
        return 'get data employee'
    }
}
