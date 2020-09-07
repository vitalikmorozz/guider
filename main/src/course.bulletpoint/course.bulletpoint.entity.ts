import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';

@Entity()
@ObjectType()
export class CourseBulletPoint {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    sortNumber: number;

    @ManyToOne(
        () => Course,
        course => course.bulletPoints,
    )
    course: Course;
}
