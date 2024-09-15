import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseValue } from 'src/common/abstract/reponse';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { PasswordCipher } from 'src/common/utils/password-cipher';
import { User } from 'src/database/entities/user.entity';
import { OtpService } from '../otp/otp.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { ForgotDto } from './dtos/forgot-password.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/register.user';
import { OtpRepository } from '../otp/otp.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private passwordCipher: PasswordCipher,
    private userService: UserService,
    private otpService: OtpService,
  ) {}

  public async authenticate(payload: LoginDto) {
    const user = await UserRepository.findOne({
      where: {
        identifier: payload.identifier,
        type: payload.type,
      },
      select: ['passwordHash', 'id', 'displayName', 'identifier'],
    });

    if (!user) throw new UnauthorizedException();
    const passMatch = await this.passwordCipher.check(
      payload.password,
      user.passwordHash,
    );
    if (!passMatch) throw new UnauthorizedException();

    return this.encode(user);
  }

  public async register(dto: RegisterUserDto, roleCode: string) {
    await this.otpService.verify({
      identifier: dto.identifier,
      code: dto.code,
    });

    const findUser = await UserRepository.findOneBy({ address: dto.identifier, type: dto?.type });
    if(findUser) throw new ConflictException(); 

    try {
      await this.userService.create({ ...dto }, roleCode);

      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async profile(userId: string) {
    const user = await UserRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'asset'],
    });
    return user;
  }

  public decode(token: string) {
    try {
      const jwt = token.replace('Bearer ', '');
      return this.jwtService.decode(jwt, { json: true }) as User;
    } catch (e) {
      return null;
    }
  }
  private encode(user: User) {
    const token = this.generateToken(user);
    return {
      token,
    };
  }

  private generateToken(user: User) {
    const payload = {
      id: user.id,
      identifier: user.identifier,
      displayName: user?.displayName,
    };
    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  public async forgotPassword(dto: ForgotDto) {
    await this.otpService.verify({
      identifier: dto.identifier,
      code: dto.code,
    });
    
    await OtpRepository.update({ identifier: dto?.identifier }, { used: true });

    try {
      const passwordHash = await this.passwordCipher.hash(dto.password);
      await UserRepository.update(
        { identifier: dto.identifier },
        { passwordHash },
      );

      return ResponseValue();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
