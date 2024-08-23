import { Student } from '../../../../domain/student';
import { InLifeStudentEntity } from '../entities/in-life-student.entity';

export class InFileStudentMapper {
  static toDomain(studentEntity: InLifeStudentEntity): Student {
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
    const entity = new InLifeStudentEntity();
    entity.id = student.id;
    entity.name = student.name;
    entity.email = student.email;
    entity.phone = student.phone;
    entity.courses = student.courses;
    return entity;
  }
}
