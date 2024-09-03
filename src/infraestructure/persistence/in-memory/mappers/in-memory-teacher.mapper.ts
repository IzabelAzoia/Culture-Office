import { Teacher } from '../../../../domain/teacher';
import { InMemoryTeacherEntity } from '../entities/in-memory-teacher.entity';

export class InMemoryTeacherMapper {
  static toDomain(teacherEntity: InMemoryTeacherEntity): Teacher {
    const model = new Teacher(
      teacherEntity.id,
      teacherEntity.name,
      teacherEntity.email,
      teacherEntity.phone,
      'Default Address', // Se 'address' for necessária no domínio, pode-se usar um valor padrão
      teacherEntity.expertise ? [teacherEntity.expertise] : [], // Converte expertise em subjects
    );
    return model;
  }

  static toPersistence(teacher: Teacher): InMemoryTeacherEntity {
    const entity = new InMemoryTeacherEntity(
      teacher.id,
      teacher.name,
      teacher.email,
      teacher.phone,
      teacher.subjects.length > 0 ? teacher.subjects[0] : 'Default Expertise', // Converte subjects em expertise
    );
    return entity;
  }
}
