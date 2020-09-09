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
import { CreateUserInput } from './input.types/create.user.input';

@Entity()
@ObjectType()
export class User {
    constructor(user?: CreateUserInput) {
        if (user) {
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.password = user.password;
        }
    }

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

    @ManyToMany(
        () => Course,
        course => course.wishListedBy,
    )
    @JoinTable()
    wishlist: Course[];

    @ManyToMany(
        () => Course,
        course => course.boughtBy,
    )
    @JoinTable()
    purchasedCourses: Course[];
}
