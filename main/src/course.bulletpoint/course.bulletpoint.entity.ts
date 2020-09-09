import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { CreateBulletPointType } from './input.types/create.course.bulletpoint';

@Entity()
@ObjectType()
export class CourseBulletPoint {
    constructor(bulletPoint?: CreateBulletPointType) {
        if (bulletPoint) {
            this.description = bulletPoint.description;
            this.sortNumber = bulletPoint.sortNumber;
        }
    }

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
