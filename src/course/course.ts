export class Course {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public teachers: string[],
  ) {}
}
