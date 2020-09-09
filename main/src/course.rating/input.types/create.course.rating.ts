import { InputType, Field } from '@nestjs/graphql';
import { Min, Max, IsPositive } from 'class-validator';

@InputType()
export class CreateCourseRatingType {
    @IsPositive({ message: 'Rating should me positive' })
    @Min(0, { message: 'Rating can not be lover than 0' })
    @Max(5, { message: 'Rating can not be higher than 5' })
    @Field()
    rating: number;
}
