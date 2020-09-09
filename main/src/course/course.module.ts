import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { CategoryModule } from 'src/course.category/category.module';
import { CategoryService } from 'src/course.category/category.service';

@Module({
    imports: [TypeOrmModule.forFeature([Course]), UserModule, CategoryModule],
    providers: [CourseService, CourseResolver, UserService, CategoryService],
    exports: [TypeOrmModule],
})
export class CourseModule {}
