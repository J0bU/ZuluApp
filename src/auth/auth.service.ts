import { ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { User, UserDocument } from '../user/user.schema';
import { JwtService } from "@nestjs/jwt";
require('dotenv').config({});

@Injectable({})
export class AuthService {

    constructor(@InjectModel(User.name)
    private userModel: Model<UserDocument>,
        private jwt: JwtService) { }

    async signup(dto: AuthDto) {
        //generate the password 
        const hash = await argon.hash(dto.hash);
        //save the new user
        try {
            const newUser = new this.userModel({
                email: dto.email,
                hash,
                fullName: dto.fullName,
                address: dto.address
            });

            const user = await newUser.save();

            return this.signToken(user.id, user.email);

        } catch (err) {
            if (err.code == 11000) {
                err = {
                    statusCode: 400,
                    message: 'That email is already registered',
                    error: "Bad Request"
                };
                return err;
            }
        }
    }

    async signin(dto: any) {

        //get the user
        const user = await this.userModel.findOne({ email: dto.email });

        //user doesn't exist
        if (!user) throw new ForbiddenException('Credentials incorrect!');

        //compare the passwords
        const comparePw = await argon.verify(user.hash, dto.hash);

        if (!comparePw) throw new ForbiddenException('Credentials incorrect!');

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        };

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: 'secret'
            });

        return {
            access_token: token
        }
    }
}