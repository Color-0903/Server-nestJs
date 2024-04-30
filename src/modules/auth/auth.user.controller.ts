import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';
import { USER_TYPE } from 'src/common/constants/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/database/entities/user.entity';
import { RegisterUserDto } from './dtos/register.user';
import { Permission } from '../permission';
import { UserReq } from 'src/common/decorators/userReq.decorator';

@ApiTags('auth-user')
@ApiBearerAuth()
@Controller('auth-user')
export class AuthUserController {
  constructor(private authService: AuthService) {}

  @Post('user/login')
  @ApiOperation({ summary: 'Login' })
  public async userLogin(
    @Body() payload: LoginDto,
  ): Promise<LoginResponseDto> {
    payload.type = USER_TYPE.USER;
    return await this.authService.authenticate(payload);
  }

  @Get('user/me')
  @ApiOperation({ summary: 'Me' })
  @UseGuards(JwtAuthGuard)
  public async userMe(@UserReq() userReq: User): Promise<User> {
    const user = await this.authService.profile(userReq.id); 
    if(!user) throw new UnauthorizedException()
    return user;
  }

  @Get('user/register')
  @ApiOperation({ summary: 'Register' })
  public async userRegister(payload: RegisterUserDto) {
    return await this.authService.register(payload, Permission.Customer.name);
  }
}
