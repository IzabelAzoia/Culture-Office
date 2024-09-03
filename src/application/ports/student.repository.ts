import { Student } from '../../domain/student';

export abstract class StudentRepository {
  abstract list(): Promise<Student[]>;
  abstract findByEmail(email: string): Promise<Student | null>;
  abstract save(student: Student): Promise<Student>;
}
