import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserInput } from 'src/user/input.types/create.user.input';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async checkIfExists(email: string) {
        return this.usersService.findOneByEmail(email);
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.checkIfExists(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(createUserDate: CreateUserInput) {
        const user = await this.usersService.create(createUserDate);
        await this.usersService.save(user);
        return this.login(user);
    }

    async login(user: any) {
        const payload = { sub: user.id };
        const currentUser = {
            access_token: this.jwtService.sign(payload),
        };
        return currentUser;
    }
}
