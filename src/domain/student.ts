export class Student {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public courses: string[],
  ) {}

  enrollInCourse(course: string): void {
    this.courses.push(course);
  }
}
