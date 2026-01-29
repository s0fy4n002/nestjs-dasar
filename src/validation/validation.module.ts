import { Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';

@Module({
  providers: [ValidationService]
})
export class ValidationModule {}
