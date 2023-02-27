import { Controller, Get } from '@nestjs/common';

import { Public } from './auth/utils';

@Controller()
export class AppController {
  @Public()
  @Get('/')
  getIndex(): string {
    return 'This is the welcome page';
  }

  @Public()
  @Get('doc')
  getDoc(): string {
    return 'There should be doc';
  }
}
