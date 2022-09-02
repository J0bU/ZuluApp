import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletController } from './wallet.controller';
import { Wallet, WalletSchema } from './wallet.schema';
import { WalletService } from './wallet.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }])],
    controllers: [WalletController],
    providers: [WalletService]
})
export class WalletModule {}
