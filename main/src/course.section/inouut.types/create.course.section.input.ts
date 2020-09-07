import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { CreateSectionMaterialType } from 'src/section.material/input.types/create.section.material';

@InputType()
export class CreateCourseSectionType {
    @IsString()
    @Field()
    name: string;

    @IsNumber()
    @Field()
    sortNumber: number;

    @Field(() => [CreateSectionMaterialType], { nullable: true })
    materials: CreateSectionMaterialType[];
}
