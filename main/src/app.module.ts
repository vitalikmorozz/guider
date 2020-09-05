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
            entities: [User, Course],
            synchronize: true,
        }),
        AuthModule,
        UserModule,
        CourseModule,
    ],
    controllers: [AppController],
})
export class AppModule {}