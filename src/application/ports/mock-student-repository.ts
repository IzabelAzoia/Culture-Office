import { ConflictException } from '@nestjs/common';
import { Student } from '../../domain/student';
import { StudentRepository } from './student.repository';

export class MockStudentRepository implements StudentRepository {
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

  async list(): Promise<Student[]> {
    return this.students;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.students.find((student) => student.email === email);
    return student || null;
  }

  async save(student: Student): Promise<Student> {
    const existingStudent = this.students.find(
      (s) => s.email === student.email,
    );
    if (existingStudent) {
      throw new ConflictException('Student with this email already exists');
    }
    this.students.push(student);
    return student;
  }
}
