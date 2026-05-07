import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from '../students/entities/student.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  // =========================
  // Grade Calculation
  // =========================
  calculateGrade(score: number): string {
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';

    return 'F';
  }

  // =========================
  // Single Student Report
  // =========================
  async getStudentReport(studentId: string) {
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return {
      studentId: student.id,
      fullName: `${student.firstName} ${student.lastName}`,
      studentNumber: student.studentNumber,
      grade: student.grade,
      stream: student.stream,
      gender: student.gender,
      parentName: student.parentName,
      status: student.isActive ? 'Active' : 'Inactive',
      generatedAt: new Date(),
    };
  }

  // =========================
  // All Student Reports
  // =========================
  async getAllReports() {
    const students = await this.studentRepo.find();

    return students.map((student) => ({
      studentId: student.id,
      fullName: `${student.firstName} ${student.lastName}`,
      studentNumber: student.studentNumber,
      grade: student.grade,
      stream: student.stream,
      status: student.isActive ? 'Active' : 'Inactive',
    }));
  }

  // =========================
  // Rankings
  // =========================
  async getRankings() {
    const students = await this.studentRepo.find();

    return students.map((student, index) => ({
      rank: index + 1,
      studentId: student.id,
      fullName: `${student.firstName} ${student.lastName}`,
      studentNumber: student.studentNumber,
    }));
  }
}