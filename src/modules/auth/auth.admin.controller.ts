import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';
import { USER_TYPE } from 'src/common/constants/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/database/entities/user.entity';
import { UserReq } from 'src/common/decorators/userReq.decorator';

@ApiTags('auth-admin')
@ApiBearerAuth()
@Controller('auth-admin')
export class AuthAdminController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  public async login(
    @Body() payload: LoginDto,
  ): Promise<LoginResponseDto> {
    payload.type = USER_TYPE.ADMIN;
    return await this.authService.authenticate(payload);
  }

  @Get('/me')
  @ApiOperation({ summary: 'Me' })
  @UseGuards(JwtAuthGuard)
  public async me(@UserReq() userReq: User): Promise<User> {
    const user = await this.authService.profile(userReq.id); 
    if(!user) throw new UnauthorizedException()
    return user;
  }

}
