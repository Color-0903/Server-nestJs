import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './dtos/login.dto';
import { PasswordCipher } from 'src/common/utils/password-cipher';
import { RegisterUserDto } from './dtos/register.user';
import { UserService } from '../user/user.service';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private passwordCipher: PasswordCipher,
    private userService: UserService
    ) {}

  public async authenticate(payload: LoginDto){
    const user = await UserRepository.findOne({
      where: {
        identifier: payload.identifier,
        type: payload.type
      },
      select: ['passwordHash', 'id', 'displayName', 'identifier']
    })
    if(!user) throw new UnauthorizedException();
    const passMatch= this.passwordCipher.check(payload.password, user.passwordHash);
    if(!passMatch) throw new UnauthorizedException();

    return this.encode(user);
  }

  public async register(payload: RegisterUserDto, roleCode: string){
    try {
      await this.userService.create({ ...payload  }, roleCode);

      return {
        result: RESPONSE_MESSAGER.SUCCESS
      }
      
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
      displayName: user?.displayName
    };
    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}
