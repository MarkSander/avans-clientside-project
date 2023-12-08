import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DeckDocument = HydratedDocument<Deck>;

@Schema()
export class Deck {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop()
  type!: string;

  @Prop()
  rarity!: string;

  @Prop()
  legendary!: boolean;

  @Prop()
  manacost!: number;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
