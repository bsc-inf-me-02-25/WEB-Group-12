import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty({ description: 'Whether the student is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}