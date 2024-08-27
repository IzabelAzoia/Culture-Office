import { Student } from '../../../../domain/student';
import { InFileStudentEntity } from '../entities/in-file-student.entity';

export class InFileStudentMapper {
  static toDomain(studentEntity: InFileStudentEntity): Student {
    const model = new Student(
      studentEntity.id,
      studentEntity.name,
      studentEntity.email,
      studentEntity.phone,
      studentEntity.courses,
    );
    return model;
  }

  static toPersistence(student: Student) {
    const entity = new InFileStudentEntity();
    entity.id = student.id;
    entity.name = student.name;
    entity.email = student.email;
    entity.phone = student.phone;
    entity.courses = student.courses;
    return entity;
  }
}
