import { Module } from '@nestjs/common';
import { InFileStudentPersistenceModule } from './persistence/in-file/in-file-student-persistence.module';
import { InMemoryStudentPersistenceModule } from './persistence/in-memory/in-memory-student-persistence.module';

@Module({})
export class StudentInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileStudentPersistenceModule
        : InMemoryStudentPersistenceModule;

    return {
      module: StudentInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
