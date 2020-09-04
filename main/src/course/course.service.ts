import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async findAll(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    async findOne(id: number): Promise<Course> {
        return this.courseRepository.findOne(id);
    }

    async deleteOne(id: number): Promise<void> {
        await this.courseRepository.delete(id);
    }
}
