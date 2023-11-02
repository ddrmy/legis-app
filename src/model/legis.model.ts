import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Legis extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao: string;

  @Prop({ required: true })
  ano: string;
}

export const LegisSchema = SchemaFactory.createForClass(Legis);
