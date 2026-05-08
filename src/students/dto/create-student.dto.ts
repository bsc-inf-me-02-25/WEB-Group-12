import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateStudentDto {

  @IsNotEmpty()
  @IsString()
  studentNumber: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsEnum(['male', 'female'])
  gender: string;

  @IsNotEmpty()
  @IsString()
  grade: string;

  @IsNotEmpty()
  @IsString()
  stream: string;

  @IsNotEmpty()
  @IsString()
  parentName: string;

  @IsNotEmpty()
  @IsString()
  parentPhone: string;
}