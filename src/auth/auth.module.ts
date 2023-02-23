import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';

import { UserModule } from '../user/user.module';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
