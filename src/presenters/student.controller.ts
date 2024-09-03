import { Controller, Post, Body } from '@nestjs/common';
import { StudentService } from 'src/application/student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  register(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.register(createStudentDto);
  }
}
