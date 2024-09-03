import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../course';

@Injectable()
export class CourseFactory {
  create(title: string, description: string, teacherIds: string[]): Course {
    const courseId = uuidv4();
    return new Course(courseId, title, description, teacherIds);
  }
}
