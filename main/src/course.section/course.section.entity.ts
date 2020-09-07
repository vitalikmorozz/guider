import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Unique,
    ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { SectionMaterial } from 'src/section.material/section.material.entity';
import { Course } from 'src/course/course.entity';

@Entity()
@ObjectType()
export class CourseSection {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    sortNumber: number;

    @Field(() => Course)
    @ManyToOne(
        () => Course,
        course => course.sections,
    )
    course: Course;

    @Field(() => [SectionMaterial])
    @OneToMany(
        () => SectionMaterial,
        sectionMaterial => sectionMaterial.section,
        { cascade: true },
    )
    materials: SectionMaterial[];
}
