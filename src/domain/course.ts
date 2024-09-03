export class Course {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public teachers: string[],
    public students: string[] = [],
  ) {}
  addTeacher(teacherId: string): void {
    this.teachers = [...this.teachers, teacherId];
  }

  setTeachers(teacherIds: string[]): void {
    this.teachers = teacherIds;
  }
  addStudent(studentId: string): void {
    this.students = [...this.students, studentId];
  }

  setStudents(studentIds: string[]): void {
    this.students = studentIds;
  }
}
