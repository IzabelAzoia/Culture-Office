import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Teacher } from '../teacher';

@Injectable()
export class TeacherFactory {
  create(
    name: string,
    address: string,
    email: string,
    phone: string,
    subjects: string[],
  ) {
    const teacherId = uuidv4();
    return new Teacher(teacherId, name, email, phone, address, subjects);
  }
}
