import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './input.types/create.user.input';
import { UpdateUserInput } from './input.types/update.user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User], { name: 'users' })
    @UseGuards(GqlAuthGuard)
    async getAll() {
        return this.userService.findAll();
    }

    @Query(() => User, { name: 'user' })
    async getOne(@Args('id') id: number) {
        return this.userService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => User, { name: 'me' })
    async me(@CurrentUser() user: User) {
        return this.userService.findOne(user.id);
    }

    @Mutation(() => User, { name: 'createUser' })
    async createUser(@Args('createUserData') createUserData: CreateUserInput) {
        return this.userService.create(createUserData);
    }

    @Mutation(() => User, { name: 'updateUser' })
    async updateUser(
        @Args('id') id: number,
        @Args('updateUserData') updateUserData: UpdateUserInput,
    ) {
        return this.userService.updateOne(id, updateUserData);
    }

    @Mutation(() => User, { name: 'deleteUser' })
    async deleteUser(@Args('id') id: number) {
        return this.userService.deleteOne(id);
    }
}
