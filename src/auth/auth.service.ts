/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDTO, SignUpDTO } from './dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ) { }

    async signUp(userData: SignUpDTO): Promise<string> {
        try {
            let { name, email, password } = userData;
            password = await bcrypt.hash(password, 10);
            const user = await this.userModel.create({
                name, email, password
            });
            const token = this.jwtService.sign({ id: user._id });
            return token;
        } catch (error) {
            if (error.code === 11000 && error.keyPattern?.email) {
                throw new ConflictException('Email is already registered');
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(userData: LoginDTO): Promise<string> {
        let { email, password } = userData;
        const user = await this.userModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = this.jwtService.sign({ id: user._id });
            return token;
        } else {
            throw new UnauthorizedException('Invalid creadentials');
        }
    }
}
