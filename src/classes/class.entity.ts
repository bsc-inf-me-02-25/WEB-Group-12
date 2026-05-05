import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  className!: string;

  @Column()
  gradeLevel!: string;

   //store student IDs as simple array
  @Column('simple-array', { nullable: true })
  studentIds!: number[];

  //@Column({
    //type: 'varchar2',
    //nullable: true,
  //})
  //studentIds: string;
}