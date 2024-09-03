import { Teacher } from '../../domain/teacher';

export class MockTeacherRepository {
  private teachers: Teacher[] = [
    new Teacher(
      '1',
      'Alice Johnson',
      'alice.johnson@example.com',
      '555-1234',
      '123 Main St',
      ['Mathematics'],
    ),
    new Teacher(
      '2',
      'Bob Williams',
      'bob.williams@example.com',
      '555-5678',
      '456 Elm St',
      ['Physics'],
    ),
  ];

  async findByEmail(email: string): Promise<Teacher | null> {
    const teacher = this.teachers.find((teacher) => teacher.email === email);
    return teacher || null;
  }

  async save(teacher: Teacher): Promise<Teacher> {
    const existingTeacherIndex = this.teachers.findIndex(
      (t) => t.email === teacher.email,
    );
    if (existingTeacherIndex > -1) {
      this.teachers[existingTeacherIndex] = teacher;
    } else {
      teacher.id = uuidv4(); // Assume que uuidv4() está implementado corretamente
      this.teachers.push(teacher);
    }
    return teacher;
  }

  async assignCourseToTeacher(email: string, course: string): Promise<void> {
    const teacher = await this.findByEmail(email);
    if (teacher) {
      teacher.assignCourse(course);
    }
  }
}
function uuidv4(): string {
  throw new Error('Function not implemented.');
}
