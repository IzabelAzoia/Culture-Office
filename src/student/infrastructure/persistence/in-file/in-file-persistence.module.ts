import { Module } from '@nestjs/common';
import { InFileStudentRepository } from './repositories/in-file-student.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: InFileStudentRepository,
      useClass: InFileStudentRepository,
    },
  ],
  exports: [InFileStudentRepository],
})
export class InFileStudentPersistenceModule {}
