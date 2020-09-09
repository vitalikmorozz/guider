import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Course } from './course/course.entity';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { CourseSectionModule } from './course.section/course.section.module';
import { CourseSection } from './course.section/course.section.entity';
import { SectionMaterial } from './section.material/section.material.entity';
import { SectionMaterialModule } from './section.material/section.material.module';
import { CourseBulletPoint } from './course.bulletpoint/course.bulletpoint.entity';
import { CourseBulletPointModule } from './course.bulletpoint/course.bulletpoint.module';
import { CourseRequirement } from './course.requrements/course.requirements.entity';
import { CourseRequirementModule } from './course.requrements/course.requirements.module';
import { Category } from './course.category/category.entity';
import { CategoryModule } from './course.category/category.module';
import { CourseRating } from './course.rating/course.rating.entity';
import { CourseRatingModule } from './course.rating/course.rating.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            context: ({ req }) => {
                return {
                    request: req,
                };
            },
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: `${process.env.POSTGRES_HOST}`,
            port: Number(process.env.POSTGRES_PORT),
            username: `${process.env.POSTGRES_USER}`,
            password: `${process.env.POSTGRES_PASSWORD}`,
            database: `${process.env.POSTGRES_DATABASE}`,
            entities: [
                User,
                Course,
                CourseSection,
                SectionMaterial,
                CourseBulletPoint,
                CourseRequirement,
                Category,
                CourseRating,
            ],
            synchronize: true,
        }),
        AuthModule,
        UserModule,
        CourseModule,
        CourseSectionModule,
        SectionMaterialModule,
        CourseBulletPointModule,
        CourseRequirementModule,
        CategoryModule,
        CourseRatingModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
