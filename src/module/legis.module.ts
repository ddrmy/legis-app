/* eslint-disable prettier/prettier */
//src/module/legis.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PythonController } from 'src/controller/python.controller';
import { LegisService } from 'src/service/legis.service';
import { LegisController } from '../controller/legis.controller';
import { Legis, LegisSchema } from '../model/legis.model';
import { PythonCodigo } from 'src/controller/python.codigo';
import { CodigoCivil } from 'src/controller/codigo-civil';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Legis.name, schema: LegisSchema }]),
  ],
  controllers: [LegisController, PythonController, PythonCodigo, CodigoCivil],
  providers: [LegisService],
})
export class LegisModule {}
