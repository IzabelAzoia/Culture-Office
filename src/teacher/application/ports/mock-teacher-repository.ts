import { Teacher } from '../../domain/teacher';

export class MockTeacherRepository {
  private teachers: Teacher[] = [
    new Teacher(
      '1',
      'Alice Johnson',
      'alice.johnson@example.com',
      '555-1234',
      'Mathematics',
    ),
    new Teacher(
      '2',
      'Bob Williams',
      'bob.williams@example.com',
      '555-5678',
      'Physics',
    ),
  ];

  async findByEmail(email: string): Promise<Teacher | null> {
    const teacher = this.teachers.find((teacher) => teacher.email === email);
    return teacher || null;
  }

  async assignCourseToTeacher(email: string, course: string): Promise<void> {
    const teacher = await this.findByEmail(email);
    if (teacher) {
      teacher.assignCourse(course);
    }
  }
}
