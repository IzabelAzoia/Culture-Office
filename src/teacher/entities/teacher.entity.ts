import { Course } from './../../course/entities/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  subject: string;

  @ManyToMany(() => Course, (course) => course.teachers)
  courses: Course[];

  constructor(
    name: string,
    address: string,
    phone: string,
    email: string,
    subject: string,
  ) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.subject = subject;
  }
}
