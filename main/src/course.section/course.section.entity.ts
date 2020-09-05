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
@Unique(['sortNumber'])
@ObjectType()
export class CourseSection {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ name: 'sortNumber' })
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
    )
    materials: SectionMaterial[];
}
