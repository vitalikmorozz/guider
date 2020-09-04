import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@Entity()
@ObjectType()
export class Course {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    headline: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    isPaid: boolean;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column()
    previewUrl: string;

    @Field(() => User)
    @ManyToOne(() => User, { cascade: true })
    author: User;
}