import { Module } from '@nestjs/common';
import { InFileTeacherRepository } from './repositories/in-file-teacher.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: InFileTeacherRepository,
      useClass: InFileTeacherRepository,
    },
  ],
  exports: [InFileTeacherRepository],
})
export class InFileTeacherPersistenceModule {}
