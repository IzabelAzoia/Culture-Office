import { Course } from '../domain/course';
import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { CreateCourseDto } from '../presenters/dto/create-course.dto';
import { BadRequestException } from '@nestjs/common';
import { MockCourseRepository } from './ports/mock-course.repository';

describe('CourseService', () => {
  let service: CourseService;
  let repository: MockCourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: MockCourseRepository, useClass: MockCourseRepository },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get<MockCourseRepository>(MockCourseRepository);
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
        '1',
        createCourseDto.name,
        createCourseDto.description,
        [createCourseDto.instructorId],
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

      const existingCourse = new Course(
        '1',
        createCourseDto.name,
        createCourseDto.description,
        [createCourseDto.instructorId],
      );

      repository.findOne = jest.fn().mockResolvedValue(existingCourse);

      await expect(service.createCourse(createCourseDto)).rejects.toThrow(
        BadRequestException,
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
