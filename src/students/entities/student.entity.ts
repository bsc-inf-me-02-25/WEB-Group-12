import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('students')
export class Student {
  @ApiProperty({ description: 'Unique student ID' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ description: 'First name' })
  @Column()
  firstName!: string;

  @ApiProperty({ description: 'Last name' })
  @Column()
  lastName!: string;

  @ApiProperty({ description: 'Unique student number' })
  @Column({ unique: true })
  studentNumber!: string;

  @ApiProperty({ description: 'Date of birth' })
  @Column({ type: 'date' })
  dateOfBirth!: string;

  @ApiProperty({ enum: Gender, description: 'Gender' })
  gender!: Gender;

  @ApiProperty({ description: 'Grade level' })
  @Column()
  grade!: string; // e.g. "Grade 1", "Grade 2", ... "Grade 7"

  @ApiProperty({ description: 'Stream' })
  @Column()
  stream!: string; // e.g. "A", "B", "C"

  // Parent / Guardian Info
  @ApiProperty({ description: 'Parent name' })
  @Column()
  parentName!: string;

  @ApiProperty({ description: 'Parent phone' })
  @Column()
  parentPhone!: string;

  @ApiProperty({ description: 'Parent email', required: false })
  @Column({ nullable: true })
  parentEmail!: string;

  @ApiProperty({ description: 'Parent address', required: false })
  @Column({ nullable: true })
  parentAddress!: string;

  @ApiProperty({ description: 'Is active' })
  @Column({ default: true })
  isActive!: boolean;

  @ApiProperty({ description: 'Created at' })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({ description: 'Updated at' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}