import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionMaterial } from './section.material.entity';
import { CourseSectionModule } from 'src/course.section/course.section.module';
import { SectionMaterialService } from './section.material.service';
import { SectionMaterialResolver } from './section.material.resolver';
import { CourseSectionService } from 'src/course.section/course.section.service';

@Module({
    imports: [TypeOrmModule.forFeature([SectionMaterial]), CourseSectionModule],
    providers: [
        SectionMaterialService,
        SectionMaterialResolver,
        CourseSectionService,
    ],
    exports: [TypeOrmModule],
})
export class SectionMaterialModule {}
