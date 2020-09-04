import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './course.entity';

@Resolver()
export class CourseResolver {
    constructor(private readonly courseService: CourseService) {}

    @Query(() => [Course], { name: 'courses' })
    async getAll() {
        return this.courseService.findAll();
    }

    @Query(() => Course, { name: 'course' })
    async getOne(@Args('id') id: number) {
        return this.courseService.findOne(id);
    }

    @Mutation(() => Course, { name: 'deleteCourse' })
    async deleteOne(@Args('id') id: number) {
        return this.courseService.deleteOne(id);
    }
}
