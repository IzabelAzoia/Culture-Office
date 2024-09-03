import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from '../application/course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from '../domain/course';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.courseService.createCourse(createCourseDto);
  }
}
