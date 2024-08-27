import { Teacher } from '../../../../domain/teacher';
import { InMemoryTeacherEntity } from '../entities/in-memory-teacher.entity';

export class InMemoryTeacherMapper {
  static toDomain(teacherEntity: InMemoryTeacherEntity): Teacher {
    const model = new Teacher(
      teacherEntity.id,
      teacherEntity.name,
      teacherEntity.email,
      teacherEntity.phone,
      teacherEntity.expertise,
    );
    return model;
  }

  static toPersistence(teacher: Teacher) {
    const entity = new InMemoryTeacherEntity();
    entity.id = teacher.id;
    entity.name = teacher.name;
    entity.email = teacher.email;
    entity.phone = teacher.phone;
    entity.expertise = teacher.expertise;
    return entity;
  }
}
