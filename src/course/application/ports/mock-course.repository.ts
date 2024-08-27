import { Course } from '../../domain/course';
import { CourseRepository } from './course.repository';

export class MockCourseRepository implements CourseRepository {
  private courses: Course[] = [
    new Course('1', 'Mathematics', 'Basic Mathematics Course', [
      'Prof. John Smith',
      'Prof. Alice Johnson',
    ]),
    new Course('2', 'Physics', 'Advanced Physics Course', [
      'Prof. Marie Curie',
      'Prof. Albert Einstein',
    ]),
  ];

  async create(course: Course): Promise<void> {
    this.courses.push(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courses;
  }

  async findById(courseId: string): Promise<Course | null> {
    const course = this.courses.find((course) => course.id === courseId);
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
