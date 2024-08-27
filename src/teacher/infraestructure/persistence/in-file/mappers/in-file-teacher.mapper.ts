import { Teacher } from '../../../../domain/teacher';
import { InFileTeacherEntity } from '../entities/in-file-teacher.entity';

export class InFileTeacherMapper {
  static toDomain(teacherEntity: InFileTeacherEntity): Teacher {
    return new Teacher(
      teacherEntity.id,
      teacherEntity.name,
      teacherEntity.email,
      teacherEntity.phone,
      teacherEntity.address,
      teacherEntity.subjects,
    );
  }

  static toPersistence(teacher: Teacher): InFileTeacherEntity {
    return {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      address: teacher.address,
      subjects: teacher.subjects,
    };
  }
}
