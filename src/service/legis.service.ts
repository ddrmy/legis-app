// src/legis/legis.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Legis } from '../model/legis.model';

@Injectable()
export class LegisService {
  constructor(@InjectModel(Legis.name) private legisModel: Model<Legis>) {}

  async create(createLegisDto) {
    const createdLegis = new this.legisModel(createLegisDto);
    return createdLegis.save();
  }

  async findAll() {
    return this.legisModel.find().exec();
  }

  async findOne(id: string) {
    return this.legisModel.findById(id).exec();
  }
}
