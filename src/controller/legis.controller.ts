/* eslint-disable prettier/prettier */
//src/controller/legis.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import { LegisService } from '../service/legis.service';

@Controller('v1')
export class LegisController {
  constructor(private readonly legisService: LegisService) {}

  // @Post('create/legis')
  // create(@Body() createLegisDto) {
  //   return this.legisService.create(createLegisDto);
  // }

  @Get('get/legis')
  getAll() {
    return this.legisService.findAll();
  }

  @Get('/legis')
  async getAllLegis() {
    return this.legisService.findAll();
  }


  // Novo endpoint para obter a legislação mais recente
  @Get('get/legis/date')
  async getLatestLegis() {
    return this.legisService.findLatestLegisData();
  }

  // Nova rota para obter todos os dados da coleção "legis-data"
  @Get('get/allLegis')
  async getAllLegisData() {
  return this.legisService.findAll();
}

@Post('create/legis')
  createLegis(@Body() createLegisDto) {
    return this.legisService.createLegis(createLegisDto);
  }

}

