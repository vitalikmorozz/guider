import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNumber } from 'class-validator';

@InputType()
export class CreateCourseInput {
    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    headline: string;

    @IsString()
    @Field()
    description: string;

    @IsBoolean()
    @Field()
    isPaid: boolean;

    @IsNumber()
    @Field()
    price: number;

    @IsString()
    @Field()
    previewUrl: string;
}
