import { Injectable } from '@nestjs/common';
import { Course } from '../../../../domain/course';
import { CourseRepository } from '../../../../../course/application/ports/course.repository';
import { InMemoryCourseEntity } from '../entities/in-memory-course.entity';
import { InMemoryCourseMapper } from '../mappers/in-memory-course.mapper';

@Injectable()
export class InMemoryCourseRepository implements CourseRepository {
  private readonly courses = new Map<string, InMemoryCourseEntity>();

  async create(course: Course): Promise<void> {
    const persistenceModel = InMemoryCourseMapper.toPersistence(course);
    this.courses.set(persistenceModel.id, persistenceModel);
  }

  async findAll(): Promise<Course[]> {
    const entities = Array.from(this.courses.values());
    return entities.map((item) => InMemoryCourseMapper.toDomain(item));
  }

  async findById(id: string): Promise<Course | null> {
    const entity = this.courses.get(id);
    if (!entity) {
      return null;
    }
    return InMemoryCourseMapper.toDomain(entity);
  }

  async findOne(criteria: Partial<Course>): Promise<Course | null> {
    const entity = Array.from(this.courses.values()).find((courseEntity) => {
      const course = InMemoryCourseMapper.toDomain(courseEntity);
      return Object.keys(criteria).every(
        (key) => course[key] === criteria[key],
      );
    });
    if (!entity) {
      return null;
    }
    return InMemoryCourseMapper.toDomain(entity);
  }

  async save(course: Course): Promise<Course> {
    const persistenceModel = InMemoryCourseMapper.toPersistence(course);
    this.courses.set(persistenceModel.id, persistenceModel);
    const newEntity = this.courses.get(persistenceModel.id);
    return InMemoryCourseMapper.toDomain(newEntity);
  }
}
