import { Course } from '../../domain/course';

export interface CourseRepository {
  create(course: Course): Promise<void>;
  findAll(): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  findOne(criteria: Partial<Course>): Promise<Course | null>;
  save(course: Course): Promise<Course>;
}
