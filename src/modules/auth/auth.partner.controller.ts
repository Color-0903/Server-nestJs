import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { USER_TYPE } from 'src/common/constants/enum';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/database/entities/user.entity';
import { Permission } from '../permission';
import { AuthService } from './auth.service';
import { CreatePartnerDto } from './dtos/admin.dto';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';

@ApiTags('auth-partner')
@ApiBearerAuth()
@Controller('auth-partner')
export class AuthPartnerController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @ApiOperation({ summary: 'signin' })
  public async login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
    payload.type = USER_TYPE.PARTNER;
    return await this.authService.authenticate(payload);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'signup' })
  public async SignUp(@Body() dto: CreatePartnerDto) {
    return await this.authService.register(
      { ...dto, type: USER_TYPE.PARTNER },
      Permission.Partner.name,
    );
  }

  @Get('/me')
  @ApiOperation({ summary: 'Me' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User })
  public async me(@UserReq() userReq: User): Promise<User> {
    const user = await this.authService.profile(userReq.id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
