import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { CreateCategoryType } from './input.types/create.category';

@Entity()
@ObjectType()
export class Category {
    constructor(category?: CreateCategoryType) {
        if (category) {
            this.name = category.name;
        }
    }

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @OneToMany(
        () => Course,
        course => course.category,
    )
    courses: Course[];
}
