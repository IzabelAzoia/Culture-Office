import { MockStudentRepository } from '../student/application/ports/mock-student-repository';
import { MockCourseRepository } from './application/ports/mock-course.repository';

export class EnrollmentController {
  private studentRepository = new MockStudentRepository();
  private courseRepository = new MockCourseRepository();

  constructor(
    studentRepository: MockStudentRepository,
    courseRepository: MockCourseRepository,
  ) {
    this.studentRepository = studentRepository;
    this.courseRepository = courseRepository;
  }

  async enrollStudentInCourse(email: string, courseId: string): Promise<void> {
    const student = await this.studentRepository.findByEmail(email);
    const course = await this.courseRepository.findById(courseId);

    if (!student) {
      throw new Error('Student not found');
    }

    if (!course) {
      throw new Error('Course not found');
    }

    student.enrollInCourse(course.name);
  }
}
