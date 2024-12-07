import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';
import { User } from 'src/database/entities/user.entity';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/auth-google-oauth')
  @UseGuards(GoogleAuthGuard)
  public async google(@Req() req: any): Promise<User> {
    return req?.user;
  }
}
