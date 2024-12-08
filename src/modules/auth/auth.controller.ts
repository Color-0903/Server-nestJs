import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dtos/auth.dto';
import { USER_TYPE } from 'src/common/constants/enum';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/google-oauth')
  public async googleAuthRedirect(@Query() dto: GoogleAuthDto) {
    return `${process.env.BACKEND_API}/auth/google-callback?type=${dto?.type ?? USER_TYPE.USER}`;
  }

  @Get('/google-callback')
  @UseGuards(GoogleAuthGuard)
  public async google(@Query() dto: GoogleAuthDto, @Req() req: any, @Res() res: Response) {
    const { token } = await this.authService.googleAuth(req?.user);

    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV != 'development',
      sameSite: 'strict',
    });

    res.redirect(process.env.GOOGLE_REDIRECT_URL);
    return true;
  }
}
