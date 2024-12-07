import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dtos/auth.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/auth-google-oauth')
  @UseGuards(GoogleAuthGuard)
  public async google(@Query() dto: GoogleAuthDto, @Req() req: any, @Res() res: Response) {
    const token = await this.authService.googleAuth(req?.user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV != 'development',
      sameSite: 'strict',
    });

    res.redirect(process.env.GOOGLE_REDIRECT_URL);
  }
}
