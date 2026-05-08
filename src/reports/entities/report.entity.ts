import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('REPORTS')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column('int')
  totalMarks: number;

  @Column()
  grade: string;

  @Column({ nullable: true })
  position: number;
}