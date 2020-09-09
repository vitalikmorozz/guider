import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateCategoryType {
    @IsString()
    @Field()
    name: string;
}
