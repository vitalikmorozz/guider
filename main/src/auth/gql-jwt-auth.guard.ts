import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const req = GqlExecutionContext.create(context).getContext().req;
        return super.canActivate(new ExecutionContextHost([req]));
    }

    handleRequest(err: any, user: any) {
        if (err || !user) throw err || new UnauthorizedException();
        return user;
    }
}
