import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AUTH_METHOD_TYPE, USER_TYPE } from 'src/common/constants/enum';
import { Permission } from 'src/modules/permission';
import { RoleRepository } from 'src/modules/role/role.repository';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_API}/auth/google-callback`,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }
  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const userType = (req.query.state ?? USER_TYPE.USER).toUpperCase();
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    let googleUser = await UserRepository.findOne({
      where: { identifier: user?.email, type: userType?.toString() },
    });
    if (!googleUser) {
      const role = await RoleRepository.findOne({
        where: { name: Permission.Partner.name },
      });
      googleUser = await UserRepository.save({
        identifier: user?.email,
        displayName: `${user?.firstName ?? ''} ${user?.lastName ?? ''} `.trim(),
        authMethod: AUTH_METHOD_TYPE.GOOGLE,
        verified: true,
        isActive: true,
        type: userType,
        passwordHash: '',
        roles: [role ?? undefined],
      });
    }

    done(null, googleUser);
  }
}
