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

@Entity()
@ObjectType()
export class Course {
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

    @ManyToMany(() => User)
    wishListedBy: User[];
}
