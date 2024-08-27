// src/teacher/teacher.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTeacherDto } from '../presenters/dto/create-teacher.dto';
import { TeacherRepository } from './ports/teacher.repository';
import { Teacher } from '../domain/teacher';

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
      createTeacherDto.courses || [],
    );

    return await this.teacherRepository.save(teacher);
  }
}
