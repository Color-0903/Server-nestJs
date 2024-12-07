import { Module } from '@nestjs/common';
import { StatisticalService } from './statistical.service';
import { StatisticalController } from './statistical.controller';

@Module({
  imports: [],
  controllers: [StatisticalController],
  providers: [StatisticalService],
  exports: [StatisticalService],
})
export class StatisticalModule {}
