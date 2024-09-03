import { Module } from '@nestjs/common';
import { ApplicationStudentBootstrapOptions } from '../common/application-student-bootstrap-options.interface';

@Module({})
export class CoreStudentModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static forRoot(options: ApplicationStudentBootstrapOptions) {
    const imports = [];

    return {
      module: CoreStudentModule,
      imports,
    };
  }
}
