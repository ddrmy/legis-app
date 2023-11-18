/* eslint-disable prettier/prettier */
//src/model/legis.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection: 'legis-data'})
export class Legis extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao: string;

  @Prop({ required: true })
  ano: Date;
}

export const LegisSchema = SchemaFactory.createForClass(Legis);
