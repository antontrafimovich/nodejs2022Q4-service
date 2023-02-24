import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';

import { UserModule } from '../user/user.module';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserExistsGuard } from './user-exists.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'random secret',
      signOptions: {
        expiresIn: '2m',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, UserExistsGuard],
  controllers: [AuthController],
})
export class AuthModule {}
