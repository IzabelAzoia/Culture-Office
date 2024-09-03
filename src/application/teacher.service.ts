import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTeacherDto } from '../presenters/dto/create-teacher.dto';
import { Teacher } from '../domain/teacher';
import { MockTeacherRepository } from './ports/mock-teacher-repository';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: MockTeacherRepository) {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const existingTeacher = await this.teacherRepository.findByEmail(
      createTeacherDto.email,
    );

    if (existingTeacher) {
      throw new BadRequestException('Teacher already exists');
    }

    const newTeacher = new Teacher(
      createTeacherDto.name,
      createTeacherDto.address,
      createTeacherDto.phone,
      createTeacherDto.email,
      createTeacherDto.subject,
    );

    // Utilize o método save para adicionar o professor
    return this.teacherRepository.save(newTeacher);
  }
}
