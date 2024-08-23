import { Course } from '../course/course';
import { MockCourseRepository } from './mock-course.repository';

export class CourseController {
  constructor(private courseRepository: MockCourseRepository) {}

  async createCourse(
    id: string,
    name: string,
    description: string,
    teachers: string[],
  ): Promise<void> {
    const newCourse = new Course(id, name, description, teachers);
    await this.courseRepository.createCourse(newCourse);
  }

  async listCourses(): Promise<Course[]> {
    return await this.courseRepository.listCourses();
  }
}
