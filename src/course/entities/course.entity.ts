import { Student } from 'src/student/domain/student';
import { Teacher } from './../../teacher/entities/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(() => Teacher, (teacher) => teacher.courses)
  teachers: Teacher[];

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];

  constructor(
    name: string,
    startDate: Date,
    endDate: Date,
    description?: string,
  ) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
