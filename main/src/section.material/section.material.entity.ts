import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { CourseSection } from 'src/course.section/course.section.entity';
import { CreateSectionMaterialType } from './input.types/create.section.material';

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
    constructor(material?: CreateSectionMaterialType) {
        if (material) {
            this.name = material.name;
            this.sortNumber = material.sortNumber;
            this.type = material.type;
            this.url = material.url;
        }
    }
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

    @ManyToOne(
        () => CourseSection,
        courseSection => courseSection.materials,
    )
    section: CourseSection;
}
