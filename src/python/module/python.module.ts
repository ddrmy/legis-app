// src/python/module/python.module.ts
import { Module } from '@nestjs/common';
import { PythonController } from '../controller/python.controller';
import { PythonService } from '../service/python.service';

@Module({
  controllers: [PythonController],
  providers: [PythonService],
})
export class PythonModule {}
