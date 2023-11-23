import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
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

export const CardSchema = SchemaFactory.createForClass(Card);
