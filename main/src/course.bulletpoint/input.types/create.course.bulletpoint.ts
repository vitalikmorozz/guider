import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBulletPointType {
    @IsString()
    @Field()
    description: string;

    @IsNumber()
    @Field()
    sortNumber: number;
}
