import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from '../presenters/teacher.controller';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
