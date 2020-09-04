import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
    id: number;

    @IsString()
    @Field()
    firstName: string;

    @IsString()
    @Field()
    lastName: string;

    @IsString()
    @IsEmail()
    @Field()
    email: string;

    @IsString()
    @Field()
    password: string;
}