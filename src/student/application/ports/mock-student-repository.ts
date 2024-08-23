import { Student } from '../../domain/student';

export class MockStudentRepository {
  private students: Student[] = [
    new Student('1', 'John Doe', 'john.doe@example.com', '555-555-5555', []),
    new Student(
      '2',
      'Jane Smith',
      'jane.smith@example.com',
      '555-555-5555',
      [],
    ),
  ];

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.students.find((student) => student.email === email);
    return student || null;
  }

  async enrollStudentInCourse(email: string, course: string): Promise<void> {
    // Ajuste para string
    const student = await this.findByEmail(email);
    if (student) {
      student.enrollInCourse(course);
    }
  }
}
