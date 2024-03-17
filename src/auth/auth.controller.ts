/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignUpDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post(`singup`)
    async singUp(@Body() userData: SignUpDTO): Promise<{token: string}> {
        const token = await this.authService.signUp(userData);
        return { token };
    }

    @Post(`login`)
    async login(@Body() userData: LoginDTO): Promise<{ token: string }> {
        const token = await this.authService.login(userData);
        return { token };
    }
}
