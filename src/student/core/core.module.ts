import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/application-bootstrap-optios.interface';

@Module({})
export class CoreModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports = [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
