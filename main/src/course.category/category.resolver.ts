import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryType } from './input.types/create.category';
import { UpdateCategoryType } from './input.types/update.category';

@Resolver()
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Query(() => [Category], { name: 'categories' })
    async getAll() {
        return this.categoryService.findAll();
    }

    @Query(() => Category, { name: 'category' })
    async getOne(@Args('id') id: number) {
        return this.categoryService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Category, {
        name: 'createCategory',
    })
    async create(
        @Args('createCategoryData')
        createCategoryData: CreateCategoryType,
    ) {
        const courseCategory = await this.categoryService.create(
            createCategoryData,
        );
        return this.categoryService.save(courseCategory);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Category, {
        name: 'updateCategory',
    })
    async updateCourse(
        @Args('id') id: number,
        @Args('updateCategoryData')
        updateCategoryData: UpdateCategoryType,
    ) {
        return this.categoryService.updateOne(id, updateCategoryData);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Category, {
        name: 'deleteCategory',
    })
    async deleteOne(@Args('id') id: number) {
        return this.categoryService.deleteOne(id);
    }
}
