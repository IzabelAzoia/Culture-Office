import { Module } from '@nestjs/common';
import { ApplicationTeacherBootstrapOptions } from '../common/application-teacher-bootstrap-options.interface';

@Module({})
export class CoreTeacherModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static forRoot(options: ApplicationTeacherBootstrapOptions) {
    const imports = [];

    return {
      module: CoreTeacherModule,
      imports,
    };
  }
}
