import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Course]), UserModule],
    providers: [CourseService, CourseResolver, UserService],
    exports: [TypeOrmModule],
})
export class CourseModule {}
