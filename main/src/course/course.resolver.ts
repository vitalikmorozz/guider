import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateCourseInput } from './input.types/create.course.input';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import {
    UseGuards,
    ForbiddenException,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UpdateCourseType } from './input.types/update.course.input';
@Resolver()
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly userService: UserService,
    ) {}

    @Query(() => [Course], { name: 'courses' })
    async getAll() {
        return this.courseService.findAll();
    }

    @Query(() => Course, { name: 'course' })
    async getOne(@Args('id') id: number) {
        return this.courseService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Course, { name: 'createCourse' })
    async create(
        @CurrentUser() user: User,
        @Args('createCourseData') createCourseData: CreateCourseInput,
    ) {
        const course = await this.courseService.create(createCourseData);
        const author = await this.userService.findOne(user.id);
        course.author = author;
        return this.courseService.save(course);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Course, { name: 'updateCourse' })
    async updateCourse(
        @CurrentUser() user: User,
        @Args('id') id: number,
        @Args('updateCourseData') updateCourseData: UpdateCourseType,
    ) {
        const course = await this.courseService.findOne(id);
        if (!course || course.author.id !== user.id)
            throw new ForbiddenException('You can not edit this course');
        return this.courseService.updateOne(id, updateCourseData);
    }

    @Mutation(() => Course, { name: 'deleteCourse' })
    async deleteOne(@Args('id') id: number) {
        return this.courseService.deleteOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User, { name: 'wishlistCourse' })
    async wishlistCourse(
        @CurrentUser() currentUser: User,
        @Args('courseId') courseId: number,
    ) {
        const user = await this.userService.findOne(currentUser.id);
        if (user.createdCourses.find(course => course.id === courseId))
            throw new ConflictException('You can not wishlist your own course');
        if (user.wishlist.find(course => course.id === courseId))
            user.wishlist = user.wishlist.filter(
                course => course.id !== courseId,
            );
        else {
            const course = await this.courseService.findOne(courseId);
            if (!course) throw new NotFoundException('Course not found');
            user.wishlist.push(course);
        }
        return this.userService.save(user);
    }
}
