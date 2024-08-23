import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { StudentFactory } from '../domain/factories/student-factory';
import { CreateStudentCommand } from './commands/create-student-commands';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { Student } from '../domain/student';
import { StudentRepository } from './ports/student.repository';

class MockStudentRepository {
  private students = [];

  async save(student: any) {
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

class MockStudentFactory {
  create(createStudentCommand: any) {
    return { ...createStudentCommand, id: 'generated-id' };
  }
}

describe('StudentService', () => {
  let service: StudentService;

  const testStudent = {
    name: 'John',
    address: 'Street 1',
    email: 'example@example.com',
    birthYear: 2000,
  } as CreateStudentCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: StudentRepository, useClass: MockStudentRepository },
        { provide: StudentFactory, useClass: MockStudentFactory },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a created student for the controller', async () => {
    const createdStudent = await service.register(testStudent);
    expect(createdStudent).toBeInstanceOf(Student);
    expect(createdStudent.id).toBeDefined();
    expect(createdStudent.name).toBe(testStudent.name);
    expect(createdStudent.email).toBe(testStudent.email);
    expect(createdStudent.phone).toBe(testStudent.phone);
    expect(createdStudent.courses).toStrictEqual([]);
  });

  it('should throw a ForbiddenException when the person is under 16 years old', () => {
    const under16TestStudent = {
      ...testStudent,
      birthYear: new Date().getFullYear() - 16,
    } as CreateStudentCommand;

    expect(() => service.register(under16TestStudent)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should not persist the birth year', async () => {
    const createdStudent = await service.register(testStudent);
    expect(createdStudent).toBeInstanceOf(Student);
    expect(createdStudent).not.toHaveProperty('birthYear');
  });

  it('should not register two students with the same email', async () => {
    await service.register(testStudent);
    await expect(service.register(testStudent)).rejects.toThrow(
      ConflictException,
    );
  });
});
