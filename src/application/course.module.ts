import { Module } from '@nestjs/common';
import { CourseController } from '../presenters/course.controller';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
