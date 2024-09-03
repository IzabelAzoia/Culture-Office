import { MockStudentRepository } from '../application/ports/mock-student-repository';

describe('MockStudentRepository', () => {
  let repository: MockStudentRepository;

  beforeEach(() => {
    repository = new MockStudentRepository();
  });

  it('should return a student by email', async () => {
    const email = 'john.doe@example.com';
    const student = await repository.findByEmail(email);
    console.log(student);
    expect(student).toBeDefined();
    expect(student?.email).toBe(email);
  });

  it('should return null if student not found by email', async () => {
    const email = 'notfound@example.com';
    const student = await repository.findByEmail(email);
    expect(student).toBeNull();
  });
});
