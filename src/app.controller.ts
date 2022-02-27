import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health-check')
  checkHealth(): string {
    const now = new Date();
    return now.toISOString();
  }
}
