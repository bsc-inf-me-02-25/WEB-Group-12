import { IsNumber } from 'class-validator';

export class AssignStudentDto {
  @IsNumber()
  studentId: number;
}