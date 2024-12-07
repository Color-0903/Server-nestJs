import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AUTH_METHOD_TYPE } from 'src/common/constants/enum';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
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
    const userType = req.query.state;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    let googleUser = await UserRepository.findOne({
      where: { identifier: user?.email },
    });
    if (!googleUser) {
      googleUser = await UserRepository.save({
        identifier: user?.email,
        displayName: `${user?.firstName ?? ''} ${user?.lastName ?? ''} `,
        authMethod: AUTH_METHOD_TYPE.GOOGLE,
        verified: true,
        isActive: true,
        type: userType,
        passwordHash: '',
      });
    }

    done(null, googleUser);
  }
}
