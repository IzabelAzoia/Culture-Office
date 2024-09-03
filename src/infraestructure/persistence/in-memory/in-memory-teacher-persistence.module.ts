import { Module } from '@nestjs/common';
import { InMemoryTeacherRepository } from './repositories/in-memory-teacher-repository';

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
