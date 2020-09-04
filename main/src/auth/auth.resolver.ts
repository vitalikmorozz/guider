import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ForbiddenException } from '@nestjs/common';
import { AccessToken } from './access.token.type';

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
}
