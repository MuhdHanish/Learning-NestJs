/* eslint-disable prettier/prettier */
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }
    async validate(payload: { id: string }) {
    const { id } = payload;
    try {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new ForbiddenException(
              'Access forbidden, authorization token failed',
            );
        }
        return user;
    } catch (error) {
        throw new ForbiddenException(
          'Access forbidden, authorization token failed',
        );
    }
    }
}