import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionMaterial } from './section.material.entity';
import { Repository } from 'typeorm';
import { CreateSectionMaterialType } from './input.types/create.section.material';
import { UpdateSectionMaterialType } from './input.types/update.section.material';

@Injectable()
export class SectionMaterialService {
    constructor(
        @InjectRepository(SectionMaterial)
        private readonly sectionMaterialRepository: Repository<SectionMaterial>,
    ) {}

    async findAll(sectionId: number): Promise<SectionMaterial[]> {
        return this.sectionMaterialRepository.find({
            where: { section: { id: sectionId } },
            relations: ['section', 'section.course', 'section.course.author'],
        });
    }

    async findOne(id: number): Promise<SectionMaterial> {
        return this.sectionMaterialRepository.findOne(id, {
            relations: ['section', 'section.course', 'section.course.author'],
        });
    }

    async findBySortNumber(
        sortNumber: number,
        sectionId: number,
    ): Promise<SectionMaterial> {
        return this.sectionMaterialRepository.findOne({
            where: { sortNumber, section: { id: sectionId } },
        });
    }

    async create(
        createSectionMaterialData: CreateSectionMaterialType,
    ): Promise<SectionMaterial> {
        const sectionMaterial = new SectionMaterial(createSectionMaterialData);
        return sectionMaterial;
    }

    async save(sectionMaterial: SectionMaterial): Promise<SectionMaterial> {
        await this.sectionMaterialRepository.save(sectionMaterial);
        return this.findOne(sectionMaterial.id);
    }

    async updateOne(
        id: number,
        updateSectionMaterialData: UpdateSectionMaterialType,
    ): Promise<SectionMaterial> {
        await this.save({ id, ...updateSectionMaterialData });
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<SectionMaterial> {
        let sectionMaterial = await this.findOne(id);
        if (!sectionMaterial)
            throw new NotFoundException('This material does not exists');
        await this.sectionMaterialRepository.delete(id);
        return sectionMaterial;
    }
}
