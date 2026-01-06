import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Default');
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
