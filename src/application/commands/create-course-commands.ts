export class CreateCourseCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly duration: number,
    public readonly teacherId: string,
    public readonly startDate: Date,
  ) {}
}
