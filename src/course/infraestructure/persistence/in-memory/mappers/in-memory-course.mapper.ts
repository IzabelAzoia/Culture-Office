import { Course } from '../../../../domain/course';
import { InMemoryCourseEntity } from '../entities/in-memory-course.entity';

export class InMemoryCourseMapper {
  static toDomain(courseEntity: InMemoryCourseEntity): Course {
    const model = new Course(
      courseEntity.id,
      courseEntity.title,
      courseEntity.description,
      [courseEntity.teacherId],
      courseEntity.students || [],
    );
    return model;
  }

  static toPersistence(course: Course): InMemoryCourseEntity {
    const entity = new InMemoryCourseEntity();
    entity.id = course.id;
    entity.title = course.name;
    entity.description = course.description;
    entity.teacherId = course.teachers[0] || '';
    entity.students = course.students || [];
    return entity;
  }
}
