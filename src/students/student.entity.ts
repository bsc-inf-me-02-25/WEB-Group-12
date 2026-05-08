import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('STUDENTS')
export class Student {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: string;

  @Column()
  gender: string;

  @Column()
  grade: string;

  @Column()
  stream: string;

  @Column()
  parentName: string;

  @Column()
  parentPhone: string;

  @Column({ default: true })
  isActive: boolean;
}