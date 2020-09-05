import { Field, InputType } from '@nestjs/graphql';
import { SectionMaterial } from 'src/section.material/section.material.entity';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Course } from 'src/course/course.entity';

@InputType()
export class UpdateCourseSectionType {
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    name: string;

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    sortNumber: number;

    materials: SectionMaterial[];

    course: Course;
}
