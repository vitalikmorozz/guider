import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
    id: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    firstName: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    lastName: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    @Field({ nullable: true })
    email: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    password: string;
}