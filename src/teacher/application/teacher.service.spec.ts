import { Test, TestingModule } from '@nestjs/testing';
import { TeacherRepository } from './teacher.repository';
import { Teacher } from '../entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from '../presenters/dto/create-teacher.dto';
import { BadRequestException } from '@nestjs/common';

describe('TeacherService', () => {
  let service: TeacherService;
  let repository: TeacherRepository;

  const teacherRepositoryMock = {
    findOneByEmail: jest.fn(),
    save: jest.fn().mockImplementation((teacher: Teacher) => {
      return { ...teacher, id: uuidv4() };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        { provide: TeacherRepository, useValue: teacherRepositoryMock },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
    repository = module.get<TeacherRepository>(TeacherRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTeacher', () => {
    it('should create a teacher successfully', async () => {
      const createTeacherDto: CreateTeacherDto = {
        name: 'John Doe',
        address: '123 Main St',
        phone: '555-555-5555',
        email: 'john.doe@example.com',
        course: ['Math', 'Science'],
        subject: '',
      };

      const teacher = new Teacher(
        createTeacherDto.name,
        createTeacherDto.address,
        createTeacherDto.phone,
        createTeacherDto.email,
        createTeacherDto.subject,
      );

      repository.findOneByEmail = jest.fn().mockResolvedValue(null);
      repository.save = jest.fn().mockResolvedValue(teacher);

      const result = await service.createTeacher(createTeacherDto);

      expect(result).toEqual(teacher);
      expect(repository.findOneByEmail).toHaveBeenCalledWith(
        createTeacherDto.email,
      );
      expect(repository.save).toHaveBeenCalledWith(teacher);
    });

    it('should throw BadRequestException if the teacher already exists', async () => {
      const createTeacherDto: CreateTeacherDto = {
        name: 'John Doe',
        address: '123 Main St',
        phone: '555-555-5555',
        email: 'john.doe@example.com',
        course: ['Math', 'Science'],
        subject: '',
      };

      repository.findOneByEmail = jest
        .fn()
        .mockResolvedValue(
          new Teacher(
            createTeacherDto.name,
            createTeacherDto.address,
            createTeacherDto.phone,
            createTeacherDto.email,
            createTeacherDto.subject,
          ),
        );

      await expect(service.createTeacher(createTeacherDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
function uuidv4() {
  throw new Error('Function not implemented.');
}
