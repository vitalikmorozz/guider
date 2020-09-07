import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateCourseRequirementType {
    @IsString()
    @Field()
    description: string;

    @IsNumber()
    @Field()
    sortNumber: number;
}
