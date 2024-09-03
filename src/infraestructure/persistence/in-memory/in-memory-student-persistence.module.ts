import { Module } from '@nestjs/common';
import { InMemoryStudentRepository } from './repositories/in-memory-student.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: InMemoryStudentRepository,
      useClass: InMemoryStudentRepository,
    },
  ],
  exports: [InMemoryStudentRepository],
})
export class InMemoryStudentPersistenceModule {}
