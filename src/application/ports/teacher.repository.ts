import { Teacher } from '../../domain/teacher';

export interface TeacherRepository {
  save(teacher: Teacher): Promise<Teacher>;
  list(): Promise<Teacher[]>;
  findById(id: string): Promise<Teacher | null>;
}
