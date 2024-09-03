import { Course } from '../../../../domain/course';
import { InFileCourseEntity } from '../entities/in-file-course.entity';

export class InFileCourseMapper {
  static toDomain(courseEntity: InFileCourseEntity): Course {
    const model = new Course(
      courseEntity.id,
      courseEntity.name,
      courseEntity.description,
      courseEntity.teachers ?? [],
    );
    return model;
  }

  static toPersistence(course: Course): InFileCourseEntity {
    const entity = new InFileCourseEntity();
    entity.id = course.id;
    entity.name = course.name;
    entity.description = course.description;
    return entity;
  }
}
