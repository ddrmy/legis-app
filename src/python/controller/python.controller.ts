// src/python/controller/python.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PythonService } from '../service/python.service';

@Controller('api/python')
export class PythonController {
  constructor(private readonly pythonService: PythonService) {}

  @Get('run-test')
  async runPythonTest() {
    const result = await this.pythonService.runPythonScript();
    return { message: result };
  }
}
