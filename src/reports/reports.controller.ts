import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // Generate report card for one student
  @Get(':id')
  generate(@Param('id') id: string) {
    return this.reportsService.generateReport(+id);
  }

  // Get all reports
  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}