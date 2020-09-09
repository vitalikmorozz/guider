import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CourseBulletPointService } from './course.bulletpoint.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { User } from 'src/user/user.entity';
import { CourseBulletPoint } from './course.bulletpoint.entity';
import { CreateBulletPointType } from './input.types/create.course.bulletpoint';
import { CourseService } from 'src/course/course.service';
import { UpdateBulletPointType } from './input.types/update.course.bulletpoint';

@Resolver()
export class CourseBulletPointResolver {
    constructor(
        private readonly courseBulletPointService: CourseBulletPointService,
        private readonly courseService: CourseService,
    ) {}

    @Query(() => [CourseBulletPoint], { name: 'courseBulletPoints' })
    async getAll(@Args('courseId') courseId: number) {
        return this.courseBulletPointService.findAll(courseId);
    }

    @Query(() => CourseBulletPoint, { name: 'bulletPoints' })
    async getOne(@Args('id') id: number) {
        return this.courseBulletPointService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseBulletPoint, { name: 'createCourseBulletPoint' })
    async create(
        @Args('courseId') courseId: number,
        @Args('createBulletPointData')
        createBulletPointData: CreateBulletPointType,
    ) {
        const courseBulletPoint = await this.courseBulletPointService.create(
            createBulletPointData,
        );
        const course = await this.courseService.findOne(courseId);
        courseBulletPoint.course = course;
        return this.courseBulletPointService.save(courseBulletPoint);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseBulletPoint, { name: 'updateCourseBulletPoint' })
    async updateCourse(
        @CurrentUser() user: User,
        @Args('id') id: number,
        @Args('updateBulletTypeData')
        updateBulletPointData: UpdateBulletPointType,
    ) {
        const courseBulletPoint = await this.courseBulletPointService.findOne(
            id,
        );
        if (
            !courseBulletPoint ||
            courseBulletPoint.course.author.id !== user.id
        )
            throw new ForbiddenException('You can not edit this bullet point');
        return this.courseBulletPointService.updateOne(
            id,
            updateBulletPointData,
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseBulletPoint, { name: 'deleteCourseBulletPoint' })
    async deleteOne(@Args('id') id: number) {
        return this.courseBulletPointService.deleteOne(id);
    }
}
