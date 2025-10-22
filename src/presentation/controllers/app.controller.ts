import { Controller, Get } from '@nestjs/common';
import { AppUseCase } from '../../application/use-cases/app.use-case';

@Controller()
export class AppController {
  constructor(private readonly appUseCase: AppUseCase) {}

  @Get()
  getHello(): string {
    return this.appUseCase.getHello();
  }
}
