import { Module } from '@nestjs/common';
import { ImportanceController } from './importance.controller';
import { ImportanceService } from './importance.service';

@Module({
  controllers: [ImportanceController],
  providers: [ImportanceService]
})
export class ImportanceModule {}
