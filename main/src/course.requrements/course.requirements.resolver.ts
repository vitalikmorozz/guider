import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CourseRequirementService } from './course.requirements.service';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';
import { CourseRequirement } from './course.requirements.entity';
import { UpdateCourseRequirementType } from './input.types/update.course.requirements';
import { CreateCourseRequirementType } from './input.types/create.course.requirements';
import { CourseService } from 'src/course/course.service';

@Resolver()
export class CourseRequirementResolver {
    constructor(
        private readonly courseRequirementService: CourseRequirementService,
        private readonly courseService: CourseService,
    ) {}

    @Query(() => [CourseRequirement], { name: 'courseRequirements' })
    async getAll(@Args('courseId') courseId: number) {
        return this.courseRequirementService.findAll(courseId);
    }

    @Query(() => CourseRequirement, { name: 'courseRequirement' })
    async getOne(@Args('id') id: number) {
        return this.courseRequirementService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseRequirement, {
        name: 'createCourseRequirement',
    })
    async create(
        @Args('courseId') courseId: number,
        @Args('createCourseRequirementData')
        createCourseRequirementData: CreateCourseRequirementType,
    ) {
        const courseCourseRequirement = await this.courseRequirementService.create(
            createCourseRequirementData,
        );
        const course = await this.courseService.findOne(courseId);
        courseCourseRequirement.course = course;
        return this.courseRequirementService.save(courseCourseRequirement);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseRequirement, {
        name: 'updateCourseRequirement',
    })
    async updateCourse(
        @CurrentUser() user: User,
        @Args('id') id: number,
        @Args('updateCourseRequirementData')
        updateCourseRequirementData: UpdateCourseRequirementType,
    ) {
        const courseCourseRequirement = await this.courseRequirementService.findOne(
            id,
        );
        if (
            !courseCourseRequirement ||
            courseCourseRequirement.course.author.id !== user.id
        )
            throw new ForbiddenException('You can not edit this requirement');
        return this.courseRequirementService.updateOne(
            id,
            updateCourseRequirementData,
        );
    }

    @Mutation(() => CourseRequirement, {
        name: 'deleteCourseRequirement',
    })
    async deleteOne(@Args('id') id: number) {
        return this.courseRequirementService.deleteOne(id);
    }
}
