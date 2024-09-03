import { Module } from '@nestjs/common';
import { ApplicationCourseBootstrapOptions } from '../common/application-course-bootstrap-options.interface';

@Module({})
export class CoreCourseModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static forRoot(options: ApplicationCourseBootstrapOptions) {
    const imports = [];

    return {
      module: CoreCourseModule,
      imports,
    };
  }
}
