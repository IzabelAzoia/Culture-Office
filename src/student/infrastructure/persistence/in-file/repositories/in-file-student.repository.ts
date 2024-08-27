import { Injectable } from '@nestjs/common';
import { InFileStudentEntity } from '../entities/in-file-student.entity';
import { Student } from '../../../../domain/student';
import { StudentRepository } from '../../../../application/ports/student.repository';
import { InFileStudentMapper } from '../mappers/in-file-student.mapper';

@Injectable()
export class InFileStudentRepository implements StudentRepository {
  private readonly students = new Map<string, InFileStudentEntity>();

  async save(student: Student): Promise<Student> {
    const entity = InFileStudentMapper.toPersistence(student);
    this.students.set(student.id, entity);
    return student;
  }

  async list(): Promise<Student[]> {
    const studentEntities = Array.from(this.students.values());
    return studentEntities.map(InFileStudentMapper.toDomain);
  }

  async findByEmail(email: string): Promise<Student | null> {
    const entity = Array.from(this.students.values()).find(
      (e) => e.email === email,
    );
    return entity ? InFileStudentMapper.toDomain(entity) : null;
  }
}
