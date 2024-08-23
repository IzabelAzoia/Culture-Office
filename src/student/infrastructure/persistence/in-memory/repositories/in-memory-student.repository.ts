import { Injectable } from '@nestjs/common';
import { Student } from '../../../../domain/student';
import { StudentRepository } from '../../../../../student/application/ports/student.repository';
import { InMemoryStudentEntity } from '../entities/in-memory-student.entity';
import { InMemoryStudentMapper } from '../mappers/in-memory-student.mapper';

@Injectable()
export class InMemoryStudentRepository implements StudentRepository {
  private readonly students = new Map<string, InMemoryStudentEntity>();

  async save(student: Student): Promise<Student> {
    const persistenceModel = InMemoryStudentMapper.toPersistence(student);
    this.students.set(persistenceModel.id, persistenceModel);
    const newEntity = this.students.get(persistenceModel.id);
    return InMemoryStudentMapper.toDomain(newEntity);
  }

  async list(): Promise<Student[]> {
    const entities = Array.from(this.students.values());
    return entities.map((item) => InMemoryStudentMapper.toDomain(item));
  }

  async findByEmail(email: string): Promise<Student> {
    const entities = Array.from(this.students.values());
    const foundStudent = entities.find((item) => item.email === email);
    if (!foundStudent) {
      return null;
    }
    return InMemoryStudentMapper.toDomain(foundStudent);
  }
}
