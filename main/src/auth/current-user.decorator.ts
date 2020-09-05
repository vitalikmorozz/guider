import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data, context) => {
    const req = GqlExecutionContext.create(context).getContext().req;
    const user = req.user;
    return user;
});
