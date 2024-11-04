import { Module } from "@nestjs/common";
import { AuthUserController } from "./auth.user.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "src/common/guards/jwt.strategy";
import { PasswordCipher } from "src/common/utils/password-cipher";
import { UserModule } from "../user/user.module";
import { AuthAdminController } from "./auth.admin.controller";
import { OtpModule } from "../otp/otp.module";
import { AuthPartnerController } from "./auth.partner.controller";

@Module({
    imports: [
      OtpModule,
      UserModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    ],
    controllers: [AuthUserController, AuthAdminController, AuthPartnerController],
    providers: [AuthService, JwtStrategy, PasswordCipher],
    exports: [AuthService],
  })
  export class AuthModule {}