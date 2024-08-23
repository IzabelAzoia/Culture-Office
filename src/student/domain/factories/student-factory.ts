import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Student } from '../student';

@Injectable()
export class StudentFactory {
  create(name: string, address: string, email: string, phone: string) {
    const studentId = uuidv4();
    const studentCourses = [];
    return new Student(studentId, name, email, phone, studentCourses);
  }
}
