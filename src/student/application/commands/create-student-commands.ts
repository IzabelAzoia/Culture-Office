export class CreateStudentCommand {
  constructor(
    public readonly name: string,
    public readonly address: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly birthYear: number,
  ) {}
}
