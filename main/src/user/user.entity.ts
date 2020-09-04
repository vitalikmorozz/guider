import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;
}
