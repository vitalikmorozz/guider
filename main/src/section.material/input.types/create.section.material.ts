import { InputType, Field } from '@nestjs/graphql';
import { AllowedTypes } from '../section.material.entity';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateSectionMaterialType {
    @IsString()
    @Field()
    name: string;

    @Field(() => AllowedTypes)
    type: AllowedTypes;

    @IsString()
    @Field()
    url: string;

    @IsNumber()
    @Field()
    sortNumber: number;

    @IsNumber()
    @Field()
    sectionId: number;
}
