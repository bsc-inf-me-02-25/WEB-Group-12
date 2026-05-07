import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  // =========================
  // Get All Reports
  // =========================
  @Get()
  getAllReports() {
    return this.reportsService.getAllReports();
  }

  // =========================
  // Get Student Report
  // =========================
  @Get('student/:id')
  getStudentReport(@Param('id') id: string) {
    return this.reportsService.getStudentReport((id),
    );
  }

  // =========================
  // Get Rankings
  // =========================
  @Get('rankings')
  getRankings() {
    return this.reportsService.getRankings();
  }
}