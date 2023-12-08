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
  set!: string;

  @Prop()
  price!: number;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
