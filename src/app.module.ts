import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './student/core/core.module';
import { StudentInfrastructureModule } from './student/infrastructure/student-infrastructure.module';
import { ApplicationBootstrapOptions } from './student/common/application-bootstrap-optios.interface';
import { StudentModule } from '../../ON36-IJS-Culture-Office/src/student/application/student.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        StudentModule.withInfrastructure(
          StudentInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
