import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NetworkResponse {
    @Field()
    status: string;

    @Field({ nullable: true })
    message?: string;
}
