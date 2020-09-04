import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Course]), UserModule],
    exports: [TypeOrmModule],
    providers: [CourseService, CourseResolver],
})
export class CourseModule {}
