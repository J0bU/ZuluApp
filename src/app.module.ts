import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
require('dotenv').config({});

@Module({
  imports: [
            MongooseModule.forRoot('mongodb+srv://J0bU:WLElnsaHWYuMFHeC@cluster0.5oocy.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, dbName: 'project' }),
            AuthModule,
            WalletModule,
            UserModule,
            WalletModule, 
            ],
})
export class AppModule {}
