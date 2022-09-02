import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { GetUser } from '../auth/decorator';
import { WalletService } from "./wallet.service";
import { Request } from 'express';


@UseGuards(JwtGuard)
@Controller('wallets')
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Post('createWallet')
    createWallet(@Body() data: any, @GetUser('id') userId: number) {
        return this.walletService.createWallet(data, userId);
    }


    @Put('updateWallet')
    updateWallet(@Req() req: Request, @GetUser('id') userId: number) {
        return this.walletService.updateWalletById(userId, req.body);
    }


}