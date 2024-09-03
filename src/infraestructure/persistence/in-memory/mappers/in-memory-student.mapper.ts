import { Student } from '../../../../domain/student';
import { InMemoryStudentEntity } from './../entities/in-memory-student.entity';

export class InMemoryStudentMapper {
  static toDomain(studentEntity: InMemoryStudentEntity): Student {
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
    const entity = new InMemoryStudentEntity();
    entity.id = student.id;
    entity.name = student.name;
    entity.email = student.email;
    entity.phone = student.phone;
    entity.courses = student.courses;
    return entity;
  }
}
