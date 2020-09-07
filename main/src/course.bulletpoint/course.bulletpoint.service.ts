import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseBulletPoint } from './course.bulletpoint.entity';
import { Repository } from 'typeorm';
import { CreateBulletPointType } from './input.types/create.course.bulletpoint';
import { UpdateBulletPointType } from './input.types/update.course.bulletpoint';

@Injectable()
export class CourseBulletPointService {
    constructor(
        @InjectRepository(CourseBulletPoint)
        private readonly courseBulletPointRepository: Repository<
            CourseBulletPoint
        >,
    ) {}

    async findAll(courseId: number): Promise<CourseBulletPoint[]> {
        return this.courseBulletPointRepository.find({
            where: { course: { id: courseId } },
            relations: ['course', 'course.author'],
        });
    }

    async findOne(id: number): Promise<CourseBulletPoint> {
        return this.courseBulletPointRepository.findOne(id, {
            relations: ['course', 'course.author'],
        });
    }

    async create(
        createBulletPointData: CreateBulletPointType,
    ): Promise<CourseBulletPoint> {
        const courseBulletPoint = new CourseBulletPoint();
        courseBulletPoint.description = createBulletPointData.description;
        courseBulletPoint.sortNumber = createBulletPointData.sortNumber;
        return courseBulletPoint;
    }

    async save(
        courseBulletPoint: CourseBulletPoint,
    ): Promise<CourseBulletPoint> {
        await this.courseBulletPointRepository.save(courseBulletPoint);
        return this.findOne(courseBulletPoint.id);
    }

    async updateOne(
        id: number,
        updateBulletPointData: UpdateBulletPointType,
    ): Promise<CourseBulletPoint> {
        await this.save({ id, ...updateBulletPointData });
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<CourseBulletPoint> {
        let courseBulletPoint = await this.findOne(id);
        if (!courseBulletPoint)
            throw new NotFoundException('This bullet point does not exists');
        await this.courseBulletPointRepository.delete(id);
        return courseBulletPoint;
    }
}
