// src/teacher/teacher.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { TeacherRepository } from './teacher.repository';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const existingTeacher = await this.teacherRepository.findOneByEmail(
      createTeacherDto.email,
    );
    if (existingTeacher) {
      throw new BadRequestException(
        'A teacher with this email already exists.',
      );
    }

    const teacher = new Teacher(
      createTeacherDto.name,
      createTeacherDto.address,
      createTeacherDto.phone,
      createTeacherDto.email,
      createTeacherDto.subject,
    );

    return await this.teacherRepository.save(teacher);
  }
}
