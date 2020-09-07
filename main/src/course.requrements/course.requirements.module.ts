import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRequirement } from './course.requirements.entity';
import { CourseModule } from 'src/course/course.module';
import { CourseRequirementService } from './course.requirements.service';
import { CourseRequirementResolver } from './course.requirements.resolver';
import { CourseService } from 'src/course/course.service';

@Module({
    imports: [TypeOrmModule.forFeature([CourseRequirement]), CourseModule],
    providers: [
        CourseRequirementService,
        CourseRequirementResolver,
        CourseService,
    ],
    exports: [TypeOrmModule],
})
export class CourseRequirementModule {}
