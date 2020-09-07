import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseBulletPoint } from './course.bulletpoint.entity';
import { CourseModule } from 'src/course/course.module';
import { CourseBulletPointService } from './course.bulletpoint.service';
import { CourseBulletPointResolver } from './course.bulletpoint.resolver';
import { CourseService } from 'src/course/course.service';

@Module({
    imports: [TypeOrmModule.forFeature([CourseBulletPoint]), CourseModule],
    providers: [
        CourseBulletPointService,
        CourseBulletPointResolver,
        CourseService,
    ],
    exports: [TypeOrmModule],
})
export class CourseBulletPointModule {}
