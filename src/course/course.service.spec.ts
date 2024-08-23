import { Course } from './entities/course.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { BadRequestException } from '@nestjs/common';

const courseRepositoryMock = {
  findOne: jest.fn(),
  save: jest.fn().mockImplementation((course: Course) => {
    return { ...course, id: '1' };
  }),
};

describe('CourseService', () => {
  let service: CourseService;
  let repository: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: CourseRepository, useValue: courseRepositoryMock },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get<CourseRepository>(CourseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCourse', () => {
    it('should create a course successfully', async () => {
      const createCourseDto: CreateCourseDto = {
        name: 'Course Name',
        description: 'Course Description',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        duration: 30,
        instructorId: '1',
        type: 'Online',
      };

      const course = new Course(
        createCourseDto.name,
        createCourseDto.startDate,
        createCourseDto.endDate,
        createCourseDto.description,
      );

      repository.findOne = jest.fn().mockResolvedValue(null);
      repository.save = jest.fn().mockResolvedValue(course);

      const result = await service.createCourse(createCourseDto);

      console.log('Expected course:', course);
      console.log('Result:', result);

      expect(result).toEqual(course);
      expect(repository.findOne).toHaveBeenCalledWith({
        name: createCourseDto.name,
      });
      expect(repository.save).toHaveBeenCalledWith(course);
    });

    it('should throw BadRequestException if the course already exists', async () => {
      const createCourseDto: CreateCourseDto = {
        name: 'Course Name',
        description: 'Course Description',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        duration: 30,
        instructorId: '1',
        type: 'Online',
      };

      repository.findOne = jest
        .fn()
        .mockResolvedValue(
          new Course(
            createCourseDto.name,
            createCourseDto.startDate,
            createCourseDto.endDate,
            createCourseDto.description,
          ),
        );
    });

    it('should throw BadRequestException if startDate is after endDate', async () => {
      const createCourseDto: CreateCourseDto = {
        name: 'Course Name',
        description: 'Course Description',
        startDate: new Date('2024-12-31'),
        endDate: new Date('2024-01-01'),
        duration: 30,
        instructorId: '1',
        type: 'Online',
      };

      await expect(service.createCourse(createCourseDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
