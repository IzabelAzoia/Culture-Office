import { Course } from './entities/course.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const existingCourse = await this.courseRepository.findOne({
      name: createCourseDto.name,
    });

    if (existingCourse) {
      throw new BadRequestException('A course with this name already exists.');
    }

    if (
      createCourseDto.startDate &&
      createCourseDto.endDate &&
      createCourseDto.startDate > createCourseDto.endDate
    ) {
      throw new BadRequestException(
        'The start date must be before the end date.',
      );
    }

    const course = new Course(
      createCourseDto.name,
      createCourseDto.startDate,
      createCourseDto.endDate,
      createCourseDto.description,
    );

    return await this.courseRepository.save(course);
  }
}
