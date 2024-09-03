export class CreateTeacherCommand {
  constructor(
    public readonly name: string,
    public readonly expertise: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly birthYear: number,
  ) {}
}
