import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseSection } from './course.section.entity';
import { CourseSectionService } from './course.section.service';
import { CourseSectionResolver } from './course.section.resolver';
import { CourseModule } from 'src/course/course.module';
import { CourseService } from 'src/course/course.service';

@Module({
    imports: [TypeOrmModule.forFeature([CourseSection]), CourseModule],
    providers: [CourseSectionService, CourseSectionResolver, CourseService],
    exports: [TypeOrmModule],
})
export class CourseSectionModule {}
