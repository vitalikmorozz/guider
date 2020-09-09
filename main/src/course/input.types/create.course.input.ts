import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNumber } from 'class-validator';
import { CreateCourseSectionType } from 'src/course.section/inouut.types/create.course.section.input';
import { CreateBulletPointType } from 'src/course.bulletpoint/input.types/create.course.bulletpoint';
import { CreateCourseRequirementType } from 'src/course.requrements/input.types/create.course.requirements';

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

    @Field()
    category_id: number;

    @Field(() => [CreateCourseSectionType], { nullable: true })
    sections: CreateCourseSectionType[];

    @Field(() => [CreateBulletPointType], { nullable: true })
    bulletPoints: CreateBulletPointType[];

    @Field(() => [CreateCourseRequirementType], { nullable: true })
    requirements: CreateCourseRequirementType[];
}
