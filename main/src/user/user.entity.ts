import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';

@Entity()
@ObjectType()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    email: string;

    @Field(() => [Course])
    @OneToMany(
        () => Course,
        course => course.author,
    )
    createdCourses: Course[];

    @Column()
    password: string;

    @Field(() => [Course])
    @ManyToMany(
        () => Course,
        course => course.wishListedBy,
    )
    @JoinTable()
    wishlist: Course[];
}
