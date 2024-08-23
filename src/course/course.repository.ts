import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseRepository {
  private courses: Course[] = [];

  create(course: Course): void {
    this.courses.push(course);
    console.log(`Created course: ${course.name}`);
  }

  findAll(): Course[] {
    return this.courses;
  }

  findById(id: string): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  findOne(criteria: Partial<Course>): Course | undefined {
    return this.courses.find((course) =>
      Object.keys(criteria).every(
        (key) => course[key as keyof Course] === criteria[key as keyof Course],
      ),
    );
  }

  save(course: Course): Course {
    const index = this.courses.findIndex((c) => c.id === course.id);
    if (index >= 0) {
      this.courses[index] = course;
    } else {
      this.courses.push(course);
    }
    return course;
  }
}
