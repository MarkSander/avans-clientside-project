import { IUser } from '@avans-nx-workshop/shared/api';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id!: string;

  @Prop({ required: true })
  username!: string;

  @Prop()
  email!: string;

  @Prop()
  password!: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
