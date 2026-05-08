import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

import { Report } from './report.entity';
import { Student } from '../students/student.entity';
import { Result } from '../results/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Student, Result])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}