import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseInput } from './input.types/create.course.input';
import { UpdateCourseType } from './input.types/update.course.input';
import { CourseSection } from 'src/course.section/course.section.entity';
import { SectionMaterial } from 'src/section.material/section.material.entity';
import { CourseBulletPoint } from 'src/course.bulletpoint/course.bulletpoint.entity';
import { CourseRequirement } from 'src/course.requrements/course.requirements.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async findAll(): Promise<Course[]> {
        return this.courseRepository.find({
            relations: [
                'author',
                'sections',
                'sections.materials',
                'bulletPoints',
                'requirements',
                'category',
            ],
        });
    }

    async findOne(id: number): Promise<Course> {
        return this.courseRepository.findOne(id, {
            relations: [
                'author',
                'sections',
                'sections.materials',
                'bulletPoints',
                'requirements',
                'category',
            ],
        });
    }

    async create(createCourseData: CreateCourseInput): Promise<Course> {
        const course = new Course(createCourseData);

        //Handle bullet points
        if (createCourseData.bulletPoints)
            course.bulletPoints = createCourseData.bulletPoints.map(
                value => new CourseBulletPoint(value),
            );

        //Handle requirements
        if (createCourseData.requirements)
            course.requirements = createCourseData.requirements.map(
                value => new CourseRequirement(value),
            );

        //Handle creating of new sections and their materials
        if (createCourseData.sections)
            course.sections = createCourseData.sections.map(value => {
                let section = new CourseSection(value);
                if (value.materials)
                    section.materials = value.materials.map(
                        item => new SectionMaterial(item),
                    );
                return section;
            });
        return course;
    }

    async save(course: Course): Promise<Course> {
        await this.courseRepository.save(course);
        return this.findOne(course.id);
    }

    async updateOne(
        id: number,
        updateCourseData: UpdateCourseType,
    ): Promise<Course> {
        await this.save({ id, ...updateCourseData });
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<Course> {
        let course = await this.findOne(id);
        if (!course) throw new NotFoundException('This course does not exists');
        await this.courseRepository.delete(id);
        return course;
    }
}
