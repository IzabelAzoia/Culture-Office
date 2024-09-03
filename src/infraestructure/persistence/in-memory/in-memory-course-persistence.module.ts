import { Module } from '@nestjs/common';
import { InMemoryCourseRepository } from './repositories/in-memory-course-repository';

@Module({
  imports: [],
  providers: [
    {
      provide: InMemoryCourseRepository,
      useClass: InMemoryCourseRepository,
    },
  ],
  exports: [InMemoryCourseRepository],
})
export class InMemoryCoursePersistenceModule {}
