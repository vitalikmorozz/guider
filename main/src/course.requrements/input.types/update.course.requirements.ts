import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Course } from 'src/course/course.entity';

@InputType()
export class UpdateCourseRequirementType {
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    description: string;

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    sortNumber: number;

    course: Course;
}
