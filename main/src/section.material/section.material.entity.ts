import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { CourseSection } from 'src/course.section/course.section.entity';

export enum AllowedTypes {
    'video',
    'document',
}

registerEnumType(AllowedTypes, {
    name: 'AllowedTypes',
});

@Entity()
@ObjectType()
export class SectionMaterial {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => AllowedTypes)
    @Column()
    type: AllowedTypes;

    @Field()
    @Column()
    url: string;

    @Field()
    @Column()
    sortNumber: number;

    @Field(() => CourseSection)
    @ManyToOne(
        () => CourseSection,
        courseSection => courseSection.materials,
    )
    section: CourseSection;
}
