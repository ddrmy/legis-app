/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PythonController } from '../controller/python.controller';

@Module({
  controllers: [PythonController], // Importe e inclua o PythonController aqui
})
export class PythonModule {}
