import { InputType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CourseSection } from 'src/course.section/course.section.entity';

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
}
