import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class Course {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    headline: string;

    @Field()
    description: string;

    @Field()
    isPaid: boolean;

    @Field()
    price: number;

    @Field()
    previewUrl: string;

    @Field()
    author_id: number;
}
