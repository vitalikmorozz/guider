import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Course } from 'src/course/course.entity';

@InputType()
export class UpdateBulletPointType {
    @IsOptional()
    @IsString()
    @Field()
    description: string;

    @IsOptional()
    @IsNumber()
    @Field()
    sortNumber: number;

    course: Course;
}
