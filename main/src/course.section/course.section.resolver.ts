import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CourseSectionService } from './course.section.service';
import {
    UseGuards,
    ForbiddenException,
    ConflictException,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CourseSection } from './course.section.entity';
import { User } from 'src/user/user.entity';
import { CreateCourseSectionType } from './inouut.types/create.course.section.input';
import { UpdateCourseSectionType } from './inouut.types/update.course.section.input';
import { CourseService } from 'src/course/course.service';

@Resolver()
export class CourseSectionResolver {
    constructor(
        private readonly courseSectionService: CourseSectionService,
        private readonly courseService: CourseService,
    ) {}

    @Query(() => [CourseSection], { name: 'courseSections' })
    async getAll(@Args('courseId') courseId: number) {
        return this.courseSectionService.findAll(courseId);
    }

    @Query(() => CourseSection, { name: 'courseSection' })
    async getOne(@Args('id') id: number) {
        return this.courseSectionService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseSection, { name: 'createCourseSection' })
    async create(
        @CurrentUser() user: User,
        @Args('courseId') courseId: number,
        @Args('createCourseSectionData')
        createCourseSectionData: CreateCourseSectionType,
    ) {
        const course = await this.courseService.findOne(courseId);

        if (!course || (await course).author.id !== user.id)
            throw new ForbiddenException('You can not edit this course');

        const courseSection = await this.courseSectionService.create(
            createCourseSectionData,
        );
        courseSection.course = course;
        return this.courseSectionService.save(courseSection);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseSection, { name: 'updateCourseSection' })
    async updateCourse(
        @CurrentUser() user: User,
        @Args('id') id: number,
        @Args('updateCourseSectionData')
        updateCourseSectionData: UpdateCourseSectionType,
    ) {
        const section = await this.courseSectionService.findOne(id);

        if (!section || (await section).course.author.id !== user.id)
            throw new ForbiddenException('You can not edit this course');

        return this.courseSectionService.updateOne(id, updateCourseSectionData);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseSection, { name: 'deleteCourseSection' })
    async deleteOne(@Args('id') id: number) {
        return this.courseSectionService.deleteOne(id);
    }
}
