import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRequirement } from './course.requirements.entity';
import { Repository } from 'typeorm';
import { CreateCourseRequirementType } from './input.types/create.course.requirements';
import { UpdateCourseRequirementType } from './input.types/update.course.requirements';

@Injectable()
export class CourseRequirementService {
    constructor(
        @InjectRepository(CourseRequirement)
        private readonly courseRequirementRepository: Repository<
            CourseRequirement
        >,
    ) {}

    async findAll(courseId: number): Promise<CourseRequirement[]> {
        return this.courseRequirementRepository.find({
            where: { course: { id: courseId } },
            relations: ['course', 'course.author'],
        });
    }

    async findOne(id: number): Promise<CourseRequirement> {
        return this.courseRequirementRepository.findOne(id, {
            relations: ['course', 'course.author'],
        });
    }

    async create(
        createCourseRequirementData: CreateCourseRequirementType,
    ): Promise<CourseRequirement> {
        const courseRequirement = new CourseRequirement();
        courseRequirement.description = createCourseRequirementData.description;
        courseRequirement.sortNumber = createCourseRequirementData.sortNumber;
        return courseRequirement;
    }

    async save(
        courseRequirement: CourseRequirement,
    ): Promise<CourseRequirement> {
        await this.courseRequirementRepository.save(courseRequirement);
        return this.findOne(courseRequirement.id);
    }

    async updateOne(
        id: number,
        updateCourseRequirementData: UpdateCourseRequirementType,
    ): Promise<CourseRequirement> {
        await this.save({ id, ...updateCourseRequirementData });
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<CourseRequirement> {
        let courseRequirement = await this.findOne(id);
        if (!courseRequirement)
            throw new NotFoundException('This requirement does not exists');
        await this.courseRequirementRepository.delete(id);
        return courseRequirement;
    }
}
