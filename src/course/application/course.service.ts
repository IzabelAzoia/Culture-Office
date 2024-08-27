import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCourseDto } from '../presenters/dto/create-course.dto';
import { CourseRepository } from './ports/course.repository';
import { Course } from '../domain/course';

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
      new Date(createCourseDto.startDate) > new Date(createCourseDto.endDate)
    ) {
      throw new BadRequestException(
        'The start date must be before the end date.',
      );
    }

    const course = new Course(
      createCourseDto.id,
      createCourseDto.name,
      createCourseDto.description,
      createCourseDto.teachers ?? [],
    );

    return await this.courseRepository.save(course);
  }
}
