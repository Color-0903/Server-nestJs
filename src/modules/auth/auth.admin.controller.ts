import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';
import { USER_TYPE } from 'src/common/constants/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserReq } from 'src/common/decorators/user.decorator';
import { User } from 'src/database/entities/user.entity';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('admin/login')
  @ApiOperation({ summary: 'Login' })
  public async adminLogin(
    @Body() payload: LoginDto,
  ): Promise<LoginResponseDto> {
    payload.type = USER_TYPE.SUPERADMIN;
    return await this.authService.authenticate(payload);
  }

  @Get('admin/me')
  @ApiOperation({ summary: 'Me' })
  @UseGuards(JwtAuthGuard)
  public async userMe(@UserReq() userReq: User): Promise<User> {
    const user = await this.authService.profile(userReq.id); 
    if(!user) throw new UnauthorizedException()
    return user;
  }

}
