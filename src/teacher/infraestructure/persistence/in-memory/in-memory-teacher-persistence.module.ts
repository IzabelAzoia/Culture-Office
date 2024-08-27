import { Module } from '@nestjs/common';
import { InMemoryTeacherRepository } from './repositories/in-memory-teacher-persistence.module';

@Module({
  imports: [],
  providers: [
    {
      provide: InMemoryTeacherRepository,
      useClass: InMemoryTeacherRepository,
    },
  ],
  exports: [InMemoryTeacherRepository],
})
export class InMemoryTeacherPersistenceModule {}
