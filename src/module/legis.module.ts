import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LegisService } from 'src/service/legis.service';
import { LegisController } from '../controller/legis.controller';
import { Legis, LegisSchema } from '../model/legis.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Legis.name, schema: LegisSchema }]),
  ],
  controllers: [LegisController],
  providers: [LegisService],
})
export class LegisModule {}
