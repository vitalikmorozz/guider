import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';
import { CreateCourseRatingType } from './input.types/create.course.rating';

@Entity()
@ObjectType()
export class CourseRating {
    constructor(rating?: CreateCourseRatingType) {
        if (rating) {
            this.rating = rating.rating;
        }
    }

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Field(() => Course)
    @ManyToOne(() => Course)
    course: Course;

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.ratings,
    )
    user: User;

    @Field()
    @Column()
    rating: number;
}
