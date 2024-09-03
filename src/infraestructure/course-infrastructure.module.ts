import { Module } from '@nestjs/common';
import { InFileCoursePersistenceModule } from './persistence/in-file/in-file-course-persistence.module';
import { InMemoryCoursePersistenceModule } from './persistence/in-memory/in-memory-course-persistence.module';

@Module({})
export class CourseInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileCoursePersistenceModule
        : InMemoryCoursePersistenceModule;

    return {
      module: CourseInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
