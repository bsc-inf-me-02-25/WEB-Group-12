import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('RESULTS')
export class Result {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  subjectId: number;

  @Column('int')
  marks: number;

  @Column({ nullable: true })
  grade: string;
}