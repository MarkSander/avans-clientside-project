import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SetDocument = HydratedDocument<Set>;

@Schema()
export class Set {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id!: string;

  @Prop()
  name!: string;

  @Prop()
  releasedate!: Date;

  @Prop()
  cardsinset!: number;

  @Prop()
  setcode!: string;
}

export const SetSchema = SchemaFactory.createForClass(Set);
