import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { addMinutes, isBefore } from 'date-fns';
import * as nodemailer from 'nodemailer';
import { RESPONSE_MESSAGER, USER_TYPE } from 'src/common/constants/enum';
import { FilterOtpDto } from './dtos/filter.dto';
import { CreateOtpDto } from './dtos/otp.dto';
import { OtpRepository } from './otp.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class OtpService {
  constructor() {}

  public async create(dto: CreateOtpDto) {

    const record = await UserRepository.findOneBy({ identifier: dto?.identifier, type: USER_TYPE.USER });
    if(!!record?.id && dto?.type == 'register') throw new ConflictException();
    else if(!record?.id && dto?.type == 'forgot') throw new NotFoundException();

    const otp = this.generateOtpCode(6);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const expiredTime = addMinutes(new Date(), 5);
    const findOtp = await OtpRepository.findOneBy({
      identifier: dto?.identifier,
    });

    try {
      await Promise.all([
        transporter.sendMail({
          from: `Mã xác nhận OTP <${process.env.GOOGLE_USER}>`,
          to: dto?.identifier,
          subject: 'Mã OTP code',
          html: `<b>Mã OTP của bạn là: ${otp}. Vui lòng bảo mật mã OTP của bạn!</b>`,
        }),
        OtpRepository.save({
          ...findOtp,
          identifier: dto.identifier,
          expired: expiredTime,
          code: otp,
          used: false,
        }),
      ]);

      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  public async verify(dto: FilterOtpDto) {
    try {
      const findOtp = await OtpRepository.findOneBy({
        identifier: dto?.identifier,
        code: dto?.code,
        used: false,
      });

      if (!findOtp) throw new NotFoundException();
      if (isBefore(findOtp.expired, new Date()))
        throw new BadRequestException('OTP_EXPIRED');
      await OtpRepository.save({
        ...findOtp,

        used: true,
      });
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  private generateOtpCode(quantity: number) {
    quantity = quantity ? quantity : 6;
    let otpCode = '';
    for (let i = 0; i < quantity; i++) {
      otpCode += Math.floor(Math.random() * 10);
    }
    return otpCode.trim();
  }
}
