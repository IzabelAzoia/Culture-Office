import { Injectable } from '@nestjs/common';
import { Course } from '../../../../domain/course';
import { CourseRepository } from '../../../../application/ports/course.repository';

@Injectable()
export class InFileCourseRepository implements CourseRepository {
  private courses: Course[] = [];

  async create(course: Course): Promise<void> {
    this.courses.push(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courses;
  }

  async findById(id: string): Promise<Course | null> {
    const course = this.courses.find((course) => course.id === id);
    return course || null;
  }

  async findOne(criteria: Partial<Course>): Promise<Course | null> {
    return (
      this.courses.find((course) =>
        Object.keys(criteria).every(
          (key) =>
            course[key as keyof Course] === criteria[key as keyof Course],
        ),
      ) || null
    );
  }

  async save(course: Course): Promise<Course> {
    const index = this.courses.findIndex((c) => c.id === course.id);
    if (index >= 0) {
      this.courses[index] = course;
    } else {
      this.courses.push(course);
    }
    return course;
  }
}
