import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { USER_TYPE } from '../constants/enum';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor() {
    super({
      accessType: 'offline',
      prompt: 'consent',
    });
  }

  getAuthenticateOptions(context: any) {
    const req = context.switchToHttp().getRequest();
    const type = req.query.type || USER_TYPE.USER;
    return {
      scope: ['email', 'profile'],
      state: type,
    };
  }
}
