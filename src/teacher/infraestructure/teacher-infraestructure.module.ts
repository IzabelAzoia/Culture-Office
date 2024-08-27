import { Module } from '@nestjs/common';
import { InMemoryTeacherPersistenceModule } from './persistence/in-memory/in-memory-teacher-persistence.module';
import { InFileTeacherPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class TeacherInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileTeacherPersistenceModule
        : InMemoryTeacherPersistenceModule;

    return {
      module: TeacherInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
