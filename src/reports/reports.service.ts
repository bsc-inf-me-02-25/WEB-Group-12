import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Report } from './report.entity';
import { Student } from '../students/student.entity';
import { Result } from '../results/result.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Result)
    private resultRepo: Repository<Result>,
  ) {}

  // Generate report for a student
  async generateReport(studentId: number) {
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
    });

    const results = await this.resultRepo.find({
      where: { studentId },
    });

    const total = results.reduce((sum, r) => sum + r.marks, 0);
    const avg = results.length ? total / results.length : 0;

    const grade = this.calculateGrade(avg);

    const report = this.reportRepo.create({
      studentId,
      totalMarks: total,
      grade,
      position: 0,
    });

    await this.reportRepo.save(report);

    return {
      student,
      results,
      totalMarks: total,
      average: avg,
      grade,
    };
  }

  findAll() {
    return this.reportRepo.find();
  }

  private calculateGrade(marks: number): string {
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  }
}