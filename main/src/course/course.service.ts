import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseInput } from './input.types/create.course.input';
import { UpdateCourseType } from './input.types/update.course.input';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async findAll(): Promise<Course[]> {
        return this.courseRepository.find({ relations: ['author'] });
    }

    async findOne(id: number): Promise<Course> {
        return this.courseRepository.findOne(id, { relations: ['author'] });
    }

    async create(createCourseData: CreateCourseInput): Promise<Course> {
        const course = new Course();
        course.name = createCourseData.name;
        course.description = createCourseData.description;
        course.headline = createCourseData.headline;
        course.isPaid = createCourseData.isPaid;
        course.price = createCourseData.price;
        course.previewUrl = createCourseData.previewUrl;
        return course;
    }

    async save(course: Course): Promise<Course> {
        return this.courseRepository.save(course);
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
