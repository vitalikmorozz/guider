import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryType } from './input.types/create.category';
import { UpdateCategoryType } from './input.types/update.category';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryService: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]> {
        return this.categoryService.find();
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryService.findOne(id);
    }

    async create(createCategoryData: CreateCategoryType): Promise<Category> {
        const category = new Category(createCategoryData);
        return category;
    }

    async save(courseRequirement: Category): Promise<Category> {
        await this.categoryService.save(courseRequirement);
        return this.findOne(courseRequirement.id);
    }

    async updateOne(
        id: number,
        updateCategoryData: UpdateCategoryType,
    ): Promise<Category> {
        await this.save({ id, ...updateCategoryData });
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<Category> {
        let category = await this.findOne(id);
        if (!category)
            throw new NotFoundException('This category does not exists');
        await this.categoryService.delete(id);
        return category;
    }
}
