import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CourseRatingService } from './course.rating.service';
import {
    UseGuards,
    ForbiddenException,
    ConflictException,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';
import { CourseRating } from './course.rating.entity';
import { CreateCourseRatingType } from './input.types/create.course.rating';
import { CourseService } from 'src/course/course.service';
import { UpdateCourseRatingType } from './input.types/update.course.rating';

@Resolver()
export class CourseRatingResolver {
    constructor(
        private readonly courseRatingService: CourseRatingService,
        private readonly courseService: CourseService,
    ) {}

    @Query(() => [CourseRating], { name: 'courseRatings' })
    async getAll(@Args('courseId') courseId: number) {
        return this.courseRatingService.findAll(courseId);
    }

    @Query(() => CourseRating, { name: 'courseRating' })
    async getOne(@Args('id') id: number) {
        return this.courseRatingService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseRating, { name: 'rateCourse' })
    async create(
        @CurrentUser() user: User,
        @Args('courseId') courseId: number,
        @Args('createCourseRatingData')
        createCourseRatingData: CreateCourseRatingType,
    ) {
        const rating = await this.courseRatingService.findOneByUserId(
            user.id,
            courseId,
        );
        if (rating && rating.course.id === courseId) {
            rating.rating = createCourseRatingData.rating;
            return this.courseRatingService.save(rating);
        }
        const courseRating = await this.courseRatingService.create(
            createCourseRatingData,
        );
        const course = await this.courseService.findOne(courseId);
        courseRating.course = course;
        courseRating.user = user;
        return this.courseRatingService.save(courseRating);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CourseRating, { name: 'deleteCourseRating' })
    async deleteOne(@CurrentUser() user: User, @Args('id') id: number) {
        const courseCourseRating = await this.courseRatingService.findOne(id);
        if (!courseCourseRating || courseCourseRating.user.id !== user.id)
            throw new ForbiddenException('You can not edit this rating');
        return this.courseRatingService.deleteOne(id);
    }
}
