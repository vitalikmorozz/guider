import { InputType, Field } from '@nestjs/graphql';
import { IsPositive, Min, Max, IsOptional } from 'class-validator';
import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';

@InputType()
export class UpdateCourseRatingType {
    @IsOptional()
    @IsPositive({ message: 'Rating should me positive' })
    @Min(0, { message: 'Rating can not be lover than 0' })
    @Max(5, { message: 'Rating can not be higher than 5' })
    @Field()
    rating: number;

    course: Course;

    user: User;
}
