import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LegisService } from '../service/legis.service';

@Controller('v1')
export class LegisController {
  constructor(private readonly legisService: LegisService) {}

  @Post('create/legis')
  create(@Body() createLegisDto) {
    return this.legisService.create(createLegisDto);
  }

  @Get('get/legis')
  findAll() {
    return this.legisService.findAll();
  }

  @Get('/legis')
  async getAllLegis() {
    return this.legisService.findAll();
  }

  @Get('get/legisById/:id')
  findOne(@Param() id: string) {
    return this.legisService.findOne(id);
  }
}
