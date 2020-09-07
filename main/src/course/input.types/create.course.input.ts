import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNumber } from 'class-validator';
import { CourseSection } from 'src/course.section/course.section.entity';
import { CreateCourseSectionType } from 'src/course.section/inouut.types/create.course.section.input';

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

    @Field(() => [CreateCourseSectionType], { nullable: true })
    sections: CreateCourseSectionType[];

    @IsString()
    @Field()
    previewUrl: string;
}
