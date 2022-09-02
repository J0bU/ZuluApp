import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { subscribeOn } from "rxjs";
import { User, UserDocument } from "../../user/user.schema";
require('dotenv').config({});

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {
    constructor(@InjectModel(User.name)
    private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret'
        })
    }

    async validate(payload: { sub: number, email: string }) {
        const user = await this.userModel.findById({_id: payload.sub});
        return user;
    }

}