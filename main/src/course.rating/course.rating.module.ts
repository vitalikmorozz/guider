import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRating } from './course.rating.entity';
import { CourseModule } from 'src/course/course.module';
import { CourseRatingResolver } from './course.rating.resolver';
import { CourseRatingService } from './course.rating.service';
import { CourseService } from 'src/course/course.service';

@Module({
    imports: [TypeOrmModule.forFeature([CourseRating]), CourseModule],
    providers: [CourseRatingResolver, CourseRatingService, CourseService],
    exports: [TypeOrmModule],
})
export class CourseRatingModule {}
