import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateStudentCommand } from './commands/create-student-commands';
import { StudentRepository } from './ports/student.repository';
import { StudentFactory } from '../domain/factories/student-factory';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly studentFactory: StudentFactory,
  ) {}

  register(createStudentCommand: CreateStudentCommand) {
    this.validateMinimumAge(createStudentCommand);
    this.validateIfAlreadyExists(createStudentCommand);

    const newStudent = this.studentFactory.create(
      createStudentCommand.name,
      createStudentCommand.address,
      createStudentCommand.email,
      createStudentCommand.phone,
    );

    return this.studentRepository.save(newStudent);
  }

  private validateIfAlreadyExists(createStudentCommand: CreateStudentCommand) {
    const existingStudent = this.studentRepository.findByEmail(
      createStudentCommand.email,
    );
    if (existingStudent) {
      throw new ConflictException(
        'A student is already registered with this email.',
      );
    }
  }

  private validateMinimumAge(createStudentCommand: CreateStudentCommand) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - createStudentCommand.birthYear;
    const MIN_REGISTRATION_AGE = 16;
    if (age <= MIN_REGISTRATION_AGE) {
      throw new ForbiddenException('The minimum registration age is 16 years.');
    }
  }

  list() {
    return this.studentRepository.list();
  }
}
