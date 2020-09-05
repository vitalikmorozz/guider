import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SectionMaterialService } from './section.material.service';
import { UseGuards, ConflictException } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';
import { SectionMaterial } from './section.material.entity';
import { CreateSectionMaterialType } from './input.types/create.section.material';
import { UpdateSectionMaterialType } from './input.types/update.section.material';
import { CourseSectionService } from 'src/course.section/course.section.service';

@Resolver()
export class SectionMaterialResolver {
    constructor(
        private readonly sectionMaterialService: SectionMaterialService,
        private readonly courseSectionService: CourseSectionService,
    ) {}

    @Query(() => [SectionMaterial], { name: 'sectionMaterials' })
    async getAll() {
        return this.sectionMaterialService.findAll();
    }

    @Query(() => SectionMaterial, { name: 'sectionMaterial' })
    async getOne(@Args('id') id: number) {
        return this.sectionMaterialService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => SectionMaterial, { name: 'createSectionMaterial' })
    async create(
        @CurrentUser() user: User,
        @Args('createSectionMaterialData')
        createSectionMaterialData: CreateSectionMaterialType,
    ) {
        const courseSection = await this.courseSectionService.findOne(
            createSectionMaterialData.sectionId,
        );

        if (
            !courseSection ||
            (await courseSection).course.author.id !== user.id
        )
            throw new ConflictException('You can not edit this course');

        const sectionMaterial = await this.sectionMaterialService.create(
            createSectionMaterialData,
        );
        sectionMaterial.section = courseSection;
        return this.sectionMaterialService.save(sectionMaterial);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => SectionMaterial, { name: 'updateSectionMaterial' })
    async updateCourse(
        @CurrentUser() user: User,
        @Args('id') id: number,
        @Args('updateSectionMaterialData')
        updateSectionMaterialData: UpdateSectionMaterialType,
    ) {
        const sectionMaterial = await this.sectionMaterialService.findOne(id);

        if (
            !sectionMaterial ||
            (await sectionMaterial).section.course.author.id !== user.id
        )
            throw new ConflictException('You can not edit this course');

        return this.sectionMaterialService.updateOne(
            id,
            updateSectionMaterialData,
        );
    }

    @Mutation(() => SectionMaterial, { name: 'deleteSectionMaterial' })
    async deleteOne(@Args('id') id: number) {
        return this.sectionMaterialService.deleteOne(id);
    }
}
