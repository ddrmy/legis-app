/* eslint-disable prettier/prettier */
// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LegisModule } from './module/legis.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbNatJuri:dbNatJuriPassword@ddrmy.bg5wlap.mongodb.net/nat-juri?retryWrites=true&w=majority',
    ),
    LegisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
