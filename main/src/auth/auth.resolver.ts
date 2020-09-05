import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ForbiddenException, ConflictException } from '@nestjs/common';
import { AccessToken } from './access.token.type';
import { CreateUserInput } from 'src/user/input.types/create.user.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AccessToken)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ) {
        const user = await this.authService.validateUser(email, password);
        if (!user)
            throw new ForbiddenException('Email or password is incorrect');
        return this.authService.login(user);
    }

    @Mutation(() => AccessToken)
    async register(@Args('user') createUserDate: CreateUserInput) {
        const user = await this.authService.checkIfExists(createUserDate.email);
        if (user)
            throw new ConflictException('User with that email already exists');
        return this.authService.register(createUserDate);
    }
}
