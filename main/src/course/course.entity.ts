import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    ManyToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { CourseSection } from 'src/course.section/course.section.entity';
import { CourseBulletPoint } from 'src/course.bulletpoint/course.bulletpoint.entity';
import { CourseRequirement } from 'src/course.requrements/course.requirements.entity';
import { Category } from 'src/course.category/category.entity';
import { CreateCourseInput } from './input.types/create.course.input';
import { CourseRating } from 'src/course.rating/course.rating.entity';

@Entity()
@ObjectType()
export class Course {
    constructor(course?: CreateCourseInput) {
        if (course) {
            this.name = course.name;
            this.description = course.description;
            this.headline = course.headline;
            this.isPaid = course.isPaid;
            this.price = course.price;
            this.previewUrl = course.previewUrl;
        }
    }

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    headline: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    isPaid: boolean;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column()
    previewUrl: string;

    @Field(() => [CourseRating])
    @OneToMany(
        () => CourseRating,
        rating => rating.course,
    )
    ratings: CourseRating[];

    @Field(() => Category)
    @ManyToOne(
        () => Category,
        category => category.courses,
        { cascade: true },
    )
    category: Category;

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.createdCourses,
        { cascade: true },
    )
    author: User;

    @Field(() => [CourseSection])
    @OneToMany(
        () => CourseSection,
        courseSection => courseSection.course,
        { cascade: true },
    )
    sections: CourseSection[];

    @Field(() => [CourseBulletPoint])
    @OneToMany(
        () => CourseBulletPoint,
        courseBulletPoint => courseBulletPoint.course,
        { cascade: true },
    )
    bulletPoints: CourseBulletPoint[];

    @Field(() => [CourseRequirement])
    @OneToMany(
        () => CourseRequirement,
        courseRequirement => courseRequirement.course,
        { cascade: true },
    )
    requirements: CourseRequirement[];

    @ManyToMany(() => User)
    wishListedBy: User[];

    @ManyToMany(
        () => User,
        user => user.purchasedCourses,
    )
    boughtBy: User[];
}
