import { Injectable } from '@nestjs/common';
import { Teacher } from '../../../../domain/teacher';
import { TeacherRepository } from '../../../../application/ports/teacher.repository';
import { InMemoryTeacherEntity } from '../entities/in-memory-teacher.entity';
import { InMemoryTeacherMapper } from '../mappers/in-memory-teacher.mapper';

@Injectable()
export class InMemoryTeacherRepository implements TeacherRepository {
  private readonly teachers = new Map<string, InMemoryTeacherEntity>();

  async save(teacher: Teacher): Promise<Teacher> {
    const persistenceModel = InMemoryTeacherMapper.toPersistence(teacher);
    this.teachers.set(persistenceModel.id, persistenceModel);
    const newEntity = this.teachers.get(persistenceModel.id);
    return InMemoryTeacherMapper.toDomain(newEntity);
  }

  async list(): Promise<Teacher[]> {
    const entities = Array.from(this.teachers.values());
    return entities.map((item) => InMemoryTeacherMapper.toDomain(item));
  }

  async findById(teacherId: string): Promise<Teacher> {
    const entity = this.teachers.get(teacherId);
    if (!entity) {
      return null;
    }
    return InMemoryTeacherMapper.toDomain(entity);
  }
}
