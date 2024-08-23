import { Course } from '../course/course';

export class MockCourseRepository {
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

  async findById(courseId: string): Promise<Course | null> {
    const course = this.courses.find((course) => course.id === courseId);
    return course || null;
  }

  async createCourse(course: Course): Promise<void> {
    this.courses.push(course);
  }

  async listCourses(): Promise<Course[]> {
    return this.courses;
  }
}
