import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Card } from '../card/card.schema';

export type DeckDocument = HydratedDocument<Deck>;

@Schema()
export class Deck {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop()
  format!: string;

  @Prop()
  userId!: string;

  @Prop()
  cards!: Card[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
