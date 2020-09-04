import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
    @Field()
    access_token: string;
}
