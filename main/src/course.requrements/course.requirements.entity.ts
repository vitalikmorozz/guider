import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { CreateCourseRequirementType } from './input.types/create.course.requirements';

@Entity()
@ObjectType()
export class CourseRequirement {
    constructor(requirement?: CreateCourseRequirementType) {
        if (requirement) {
            this.description = requirement.description;
            this.sortNumber = requirement.sortNumber;
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
        course => course.requirements,
    )
    course: Course;
}
