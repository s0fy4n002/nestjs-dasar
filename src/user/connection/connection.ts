import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


export class Connection {
    getName(): string | null {
        return null
    }
}

@Injectable()
export class MySQLConnection extends Connection {
    getName(): string | null {
        return 'MySQL';
    }
}

@Injectable()
export class MongoDBConnection extends Connection {
    getName(): string | null {
        return 'MongoDB';
    }
}

export function createConnection(configService: ConfigService) {
    const databaseType = configService.get('DATABASE');

    return databaseType === 'mysql'
        ? new MySQLConnection()
        : new MongoDBConnection();
}