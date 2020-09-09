import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSection } from './course.section.entity';
import { Repository } from 'typeorm';
import { CreateCourseSectionType } from './inouut.types/create.course.section.input';
import { UpdateCourseSectionType } from './inouut.types/update.course.section.input';
import { SectionMaterial } from 'src/section.material/section.material.entity';

@Injectable()
export class CourseSectionService {
    constructor(
        @InjectRepository(CourseSection)
        private readonly courseSectionRepository: Repository<CourseSection>,
    ) {}

    async findAll(courseId: number): Promise<CourseSection[]> {
        return this.courseSectionRepository.find({
            where: { course: { id: courseId } },
            relations: ['materials', 'course', 'course.author'],
        });
    }

    async findOne(id: number): Promise<CourseSection> {
        return this.courseSectionRepository.findOne(id, {
            relations: ['materials', 'course', 'course.author'],
        });
    }

    async findBySortNumber(
        sortNumber: number,
        courseId: number,
    ): Promise<CourseSection> {
        return this.courseSectionRepository.findOne({
            where: { sortNumber, course: { id: courseId } },
        });
    }

    async create(
        createCourseSectionData: CreateCourseSectionType,
    ): Promise<CourseSection> {
        const courseSection = new CourseSection(createCourseSectionData);
        if (createCourseSectionData.materials)
            courseSection.materials = createCourseSectionData.materials.map(
                value => new SectionMaterial(value),
            );
        return courseSection;
    }

    async save(courseSection: CourseSection): Promise<CourseSection> {
        await this.courseSectionRepository.save(courseSection);
        return this.findOne(courseSection.id);
    }

    async updateOne(
        id: number,
        updateCourseSectionData: UpdateCourseSectionType,
    ): Promise<CourseSection> {
        await this.save({ id, ...updateCourseSectionData });
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<CourseSection> {
        let courseSection = await this.findOne(id);
        if (!courseSection)
            throw new NotFoundException('This section does not exists');
        await this.courseSectionRepository.delete(id);
        return courseSection;
    }
}
