import { MockStudentRepository } from '../student/application/ports/mock-student-repository';
import { MockCourseRepository } from '../course/mock-course.repository';
import { EnrollmentController } from '../course/enroll-ment.controller';

const studentRepository = new MockStudentRepository();
const courseRepository = new MockCourseRepository();
const enrollmentController = new EnrollmentController(
  studentRepository,
  courseRepository,
);

describe('EnrollmentController', () => {
  it('should enroll a student in a course', async () => {
    const course = await courseRepository.findById('1');
    if (course) {
      await enrollmentController.enrollStudentInCourse(
        'john.doe@example.com',
        '1',
      );
      const student = await studentRepository.findByEmail(
        'john.doe@example.com',
      );
      expect(student?.courses.length).toBe(1);
      expect(student?.courses[0]).toBe(course.name);
    }
  });

  it('should throw an error if course not found', async () => {
    await expect(
      enrollmentController.enrollStudentInCourse('john.doe@example.com', '999'),
    ).rejects.toThrow('Course not found');
  });
});
