import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { AllowedTypes } from '../section.material.entity';
import { CourseSection } from 'src/course.section/course.section.entity';

@InputType()
export class UpdateSectionMaterialType {
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    name: string;

    @IsOptional()
    @Field(() => AllowedTypes, { nullable: true })
    type: AllowedTypes;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    url: string;

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    sortNumber: number;

    section: CourseSection;
}
