import { Module, Type, DynamicModule } from '@nestjs/common';
import { StudentService } from '../application/student.service';
import { StudentFactory } from '../domain/factories/student-factory';
import { StudentController } from '../presenters/student.controller';

@Module({
  controllers: [StudentController],
  providers: [StudentService, StudentFactory],
})
export class StudentModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: StudentModule,
      imports: [infrastructureModule],
    };
  }
}
