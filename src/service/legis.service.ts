/* eslint-disable prettier/prettier */
// src/legis/legis.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Legis } from '../model/legis.model';

@Injectable()
export class LegisService {
  constructor(@InjectModel(Legis.name) private legisModel: Model<Legis>) {}
  
  async findAll() {
    return this.legisModel.find().exec();
  }
  

    async create(createLegisDto: any) {
      const createdLegis = new this.legisModel(createLegisDto);
      return createdLegis.save();
    }


  async findLatestLegisData() {
    try {
      const latestLegis = await this.legisModel
        .find()
        .sort({ ano: -1 }) // Ordena em ordem decrescente com base na data
        .limit(1)          // Limita o resultado a 1 documento
        .exec();
  
      return latestLegis;
    } catch (error) {
      // Lide com o erro, se necessário
      console.error('Erro ao buscar a legislação mais recente:', error);
      throw error;
    }
  }

  async createLegis(createLegisDto: any) {
    const createdLegis = new this.legisModel(createLegisDto);
    return createdLegis.save();
  }

  async findOne(id: string) {
    return this.legisModel.findById(id).exec();
  }
}
