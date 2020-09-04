import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => {
    const user = req.args[2].req.user;
    return user;
});
