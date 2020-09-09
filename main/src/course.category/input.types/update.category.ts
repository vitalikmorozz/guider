import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Course } from 'src/course/course.entity';

@InputType()
export class UpdateCategoryType {
    @IsOptional()
    @IsString()
    @Field()
    name: string;

    courses: Course[];
}
