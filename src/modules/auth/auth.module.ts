import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guards/jwt.strategy';
import { PasswordCipher } from 'src/common/utils/password-cipher';
import { OtpModule } from '../otp/otp.module';
import { UserModule } from '../user/user.module';
import { AuthAdminController } from './auth.admin.controller';
import { AuthController } from './auth.controller';
import { AuthPartnerController } from './auth.partner.controller';
import { AuthService } from './auth.service';
import { AuthUserController } from './auth.user.controller';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    OtpModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController, AuthUserController, AuthAdminController, AuthPartnerController],
  providers: [AuthService, JwtStrategy, PasswordCipher, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
