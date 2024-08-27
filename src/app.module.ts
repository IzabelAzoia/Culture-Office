import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreStudentModule } from './student/core/core-student.module';
import { StudentInfrastructureModule } from './student/infrastructure/student-infrastructure.module';
import { ApplicationStudentBootstrapOptions } from './student/common/application-student-bootstrap-options.interface';
import { StudentModule } from './student/application/student.module';

@Module({
  imports: [CoreStudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationStudentBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreStudentModule.forRoot(options),
        StudentModule.withInfrastructure(
          StudentInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
