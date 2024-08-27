import { Injectable } from '@nestjs/common';
import { InFileTeacherEntity } from '../entities/in-file-teacher.entity';
import { Teacher } from '../../../../domain/teacher';
import { TeacherRepository } from '../../../../application/ports/teacher.repository';
import { InFileTeacherMapper } from '../mappers/in-file-teacher.mapper';

@Injectable()
export class InFileTeacherRepository implements TeacherRepository {
  private readonly teachers = new Map<string, InFileTeacherEntity>();

  async save(teacher: Teacher): Promise<Teacher> {
    const entity = InFileTeacherMapper.toPersistence(teacher);
    this.teachers.set(teacher.id, entity);
    return teacher;
  }

  async list(): Promise<Teacher[]> {
    const teacherEntities = Array.from(this.teachers.values());
    return teacherEntities.map(InFileTeacherMapper.toDomain);
  }

  async findById(id: string): Promise<Teacher | null> {
    const entity = this.teachers.get(id);
    return entity ? InFileTeacherMapper.toDomain(entity) : null;
  }
}
