import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateCourseSectionType {
    @IsString()
    @Field()
    name: string;

    @IsNumber()
    @Field()
    sortNumber: number;

    @IsNumber()
    @Field()
    courseId: number;
}
