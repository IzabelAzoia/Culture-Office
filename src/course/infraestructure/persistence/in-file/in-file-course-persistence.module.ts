import { Module } from '@nestjs/common';
import { InFileCourseRepository } from './repositories/in-file-course-repository.module';

@Module({
  imports: [],
  providers: [
    {
      provide: InFileCourseRepository,
      useClass: InFileCourseRepository,
    },
  ],
  exports: [InFileCourseRepository],
})
export class InFileCoursePersistenceModule {}
