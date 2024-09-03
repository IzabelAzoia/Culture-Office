import { Controller, Post, Body } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherService } from '../application/teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }
}
