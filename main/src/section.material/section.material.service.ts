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

    async findAll(): Promise<SectionMaterial[]> {
        return this.sectionMaterialRepository.find({
            relations: ['section', 'section.course', 'section.course.author'],
        });
    }

    async findOne(id: number): Promise<SectionMaterial> {
        return this.sectionMaterialRepository.findOne(id, {
            relations: ['section', 'section.course', 'section.course.author'],
        });
    }

    async create(
        createSectionMaterialData: CreateSectionMaterialType,
    ): Promise<SectionMaterial> {
        const sectionMaterial = new SectionMaterial();
        sectionMaterial.name = createSectionMaterialData.name;
        sectionMaterial.sortNumber = createSectionMaterialData.sortNumber;
        sectionMaterial.type = createSectionMaterialData.type;
        sectionMaterial.url = createSectionMaterialData.url;
        return sectionMaterial;
    }

    async save(sectionMaterial: SectionMaterial): Promise<SectionMaterial> {
        return this.sectionMaterialRepository.save(sectionMaterial);
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
