import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  balanceUSD: number;

  @Prop()
  balanceCOP: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);