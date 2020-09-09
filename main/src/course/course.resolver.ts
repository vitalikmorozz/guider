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
import { NetworkResponse } from 'src/types';
import { CategoryService } from 'src/course.category/category.service';
@Resolver()
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly userService: UserService,
        private readonly categoryService: CategoryService,
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
        const category = await this.categoryService.findOne(
            createCourseData.category_id,
        );
        if (!category)
            throw new NotFoundException('Category with specified id not found');
        course.category = category;
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

    @UseGuards(GqlAuthGuard)
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

    @UseGuards(GqlAuthGuard)
    @Mutation(() => NetworkResponse, { name: 'buyCourse' })
    async buyCourse(
        @CurrentUser() currentUser: User,
        @Args('courseId') courseId: number,
    ): Promise<NetworkResponse> {
        const user = await this.userService.findOne(currentUser.id);
        if (user.createdCourses.find(course => course.id === courseId))
            throw new ConflictException('You can not buy your own course');
        if (user.purchasedCourses.find(course => course.id === courseId))
            throw new ConflictException('You already bought this course');
        else {
            const course = await this.courseService.findOne(courseId);
            if (!course) throw new NotFoundException('Course not found');
            user.purchasedCourses.push(course);
        }
        await this.userService.save(user);
        return { status: 'ok' };
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Course], { name: 'myWishList' })
    async myWishList(@CurrentUser() currentUser: User) {
        const user = await this.userService.findOne(currentUser.id);
        return user.wishlist;
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Course], { name: 'myPurchasedCoursesList' })
    async myPurchasedCoursesList(@CurrentUser() currentUser: User) {
        const user = await this.userService.findOne(currentUser.id);
        return user.purchasedCourses;
    }
}
