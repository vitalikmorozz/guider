import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { accessTokenSecret } from './jwsSecret';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: accessTokenSecret,
        });
    }

    async validate(payload: any) {
        const user = this.userService.findOne(payload.sub);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}
