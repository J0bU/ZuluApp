import { ForbiddenException, Injectable, Req } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet, WalletDocument } from "./wallet.schema";
import { User, UserDocument } from "../user/user.schema";
import { timeStamp } from "console";

@Injectable()
export class WalletService {

    constructor(
        @InjectModel(Wallet.name)
        private walletModel: Model<WalletDocument>
    ) { }

    async createWallet(dto: any, userId: number) {

        const isUser = await this.walletModel.findOne({ user: userId });
        if (isUser) throw new ForbiddenException('This user has a wallet!');

        const balanceCOP = dto.balanceUSD * 4300;
        const newWallet = new this.walletModel({
            user: userId,
            balanceUSD: dto.balanceUSD,
            balanceCOP: balanceCOP
        });

        const wallet = await newWallet.save();
        return wallet;
    }

    async updateWalletById(userId: number, {newMoney}: any){

        const {balanceUSD} = await this.walletModel.findOne({user: userId});
        const newBalanceUSD = balanceUSD + newMoney;
        const newBalanceCOP = newBalanceUSD * 4300;
        const updatedUser = await this.walletModel.findOneAndUpdate({user: userId}, {
            balanceUSD: newBalanceUSD,
            balanceCOP: newBalanceCOP
        }, {new: true});

        return updatedUser;
    }

}