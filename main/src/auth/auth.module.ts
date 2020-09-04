import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { accessTokenSecret } from './jwsSecret';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: accessTokenSecret,
        }),
    ],
    providers: [AuthService, UserService, AuthResolver, JwtStrategy],
    exports: [],
})
export class AuthModule {}
