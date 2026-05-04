import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
  IsDateString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entities/student.entity';

export class CreateStudentDto {
  @ApiProperty({ description: 'First name of the student' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ description: 'Last name of the student' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ description: 'Unique student number' })
  @IsString()
  @IsNotEmpty()
  studentNumber!: string;

  @ApiProperty({ description: 'Date of birth in YYYY-MM-DD format' })
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty({ enum: Gender, description: 'Gender of the student' })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty({ description: 'Grade level, e.g., "Grade 1"' })
  @IsString()
  @IsNotEmpty()
  grade!: string;

  @ApiProperty({ description: 'Stream, e.g., "A"' })
  @IsString()
  @IsNotEmpty()
  stream!: string;

  @ApiProperty({ description: 'Parent or guardian name' })
  @IsString()
  @IsNotEmpty()
  parentName!: string;

  @ApiProperty({ description: 'Parent or guardian phone number' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9\s\-()]{7,15}$/, { message: 'parentPhone must be a valid phone number' })
  parentPhone!: string;

  @ApiProperty({ description: 'Parent or guardian email', required: false })
  @IsOptional()
  @IsEmail()
  parentEmail?: string;

  @IsOptional()
  @IsString()
  parentAddress?: string;
}