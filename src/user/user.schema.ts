import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  hash: string;

  @Prop({required: true})
  fullName: string;

  @Prop({required: true})
  address: string
}

export const UserSchema = SchemaFactory.createForClass(User);