import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Course } from 'src/course/course.entity';

@InputType()
export class UpdateBulletPointType {
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
