export class Teacher {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public address: string,
    public subjects: string[] = [],
  ) {}

  addSubject(subject: string): void {
    this.subjects.push(subject);
  }
  assignCourse(course: string): void {
    this.addSubject(course);
  }
}
