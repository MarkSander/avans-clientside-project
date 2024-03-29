import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop()
  type!: string;

  @Prop()
  rarity!: string;

  @Prop()
  foil!: boolean;

  @Prop()
  manacost!: number;

  @Prop()
  releasedate!: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
