import { InputType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CourseSection } from 'src/course.section/course.section.entity';
import { CourseBulletPoint } from 'src/course.bulletpoint/course.bulletpoint.entity';
import { CourseRequirement } from 'src/course.requrements/course.requirements.entity';
import { Category } from 'src/course.category/category.entity';
import { CourseRating } from 'src/course.rating/course.rating.entity';

@InputType()
export class UpdateCourseType {
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    name: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    headline: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    description: string;

    @IsBoolean()
    @IsOptional()
    @Field({ nullable: true })
    isPaid: boolean;

    @IsNumber()
    @IsOptional()
    @Field({ nullable: true })
    price: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    previewUrl: string;

    author: User;

    sections: CourseSection[];

    wishListedBy: User[];

    bulletPoints: CourseBulletPoint[];

    requirements: CourseRequirement[];

    category: Category;

    boughtBy: User[];

    ratings: CourseRating[];
}
