import { Injectable } from '@nestjs/common';
import { InLifeStudentEntity } from '../entities/in-life-student.entity';
import { Student } from '../../../../domain/student';
import { StudentRepository } from '../../../../application/ports/student.repository';

@Injectable()
export class InFileStudentRepository implements StudentRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(student: Student): Promise<Student> {
    throw new Error('Method not implemented.');
  }

  list(): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByEmail(email: string): Promise<Student> {
    throw new Error('Method not implemented.');
  }

  private readonly students = new Map<string, InLifeStudentEntity>();
}
