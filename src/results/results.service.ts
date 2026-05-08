import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultRepo: Repository<Result>,
  ) {}

  async create(data: any) {
    const grade = this.calculateGrade(data.marks);

    const result = this.resultRepo.create({
      ...data,
      grade,
    });

    return this.resultRepo.save(result);
  }

  findAll() {
    return this.resultRepo.find();
  }

  private calculateGrade(marks: number): string {
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  }
}