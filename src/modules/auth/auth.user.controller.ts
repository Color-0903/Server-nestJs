import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/abstract/reponse';
import { USER_TYPE } from 'src/common/constants/enum';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/database/entities/user.entity';
import { Permission } from '../permission';
import { AuthService } from './auth.service';
import { ForgotDto } from './dtos/forgot-password.dto';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/register.user';

@ApiTags('auth-user')
@ApiBearerAuth()
@Controller('auth-user')
export class AuthUserController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  public async login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
    payload.type = USER_TYPE.USER;
    return await this.authService.authenticate(payload);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User })
  public async me(@UserReq() userReq: User): Promise<User> {
    const user = await this.authService.profile(userReq.id);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  public async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(
      { ...dto, type: USER_TYPE.USER },
      Permission.Authenticated.name,
    );
  }

  @Post('/forgot-password')
  @ApiOkResponse({ type: ResponseDto })
  public async forgot(@Body() dto: ForgotDto) {
    return await this.authService.forgotPassword(dto);
  }
}
