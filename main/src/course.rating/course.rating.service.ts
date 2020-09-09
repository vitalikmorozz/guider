import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseRating } from './course.rating.entity';
import { CreateCourseRatingType } from './input.types/create.course.rating';
import { UpdateCourseRatingType } from './input.types/update.course.rating';

@Injectable()
export class CourseRatingService {
    constructor(
        @InjectRepository(CourseRating)
        private readonly courseRatingRepository: Repository<CourseRating>,
    ) {}

    async findAll(courseId: number): Promise<CourseRating[]> {
        return this.courseRatingRepository.find({
            where: { course: { id: courseId } },
            relations: ['course', 'user'],
        });
    }

    async findOne(id: number): Promise<CourseRating> {
        return this.courseRatingRepository.findOne(id, {
            relations: ['course', 'user'],
        });
    }

    findOneByUserId(userId: number, courseId: number): Promise<CourseRating> {
        return this.courseRatingRepository.findOne({
            where: { user: { id: userId }, course: { id: courseId } },
            relations: ['course', 'user'],
        });
    }

    async create(
        createCourseRatingData: CreateCourseRatingType,
    ): Promise<CourseRating> {
        const courseRating = new CourseRating(createCourseRatingData);
        return courseRating;
    }

    async save(courseRating: CourseRating): Promise<CourseRating> {
        await this.courseRatingRepository.save(courseRating);
        return this.findOne(courseRating.id);
    }

    async updateOne(
        id: number,
        updateCourseRatingData: UpdateCourseRatingType,
    ): Promise<CourseRating> {
        await this.save({ id, ...updateCourseRatingData });
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<CourseRating> {
        let courseRating = await this.findOne(id);
        if (!courseRating)
            throw new NotFoundException('This document does not exists');
        await this.courseRatingRepository.delete(id);
        return courseRating;
    }
}
