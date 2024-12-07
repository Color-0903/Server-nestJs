import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { addMinutes, isBefore } from 'date-fns';
import * as moment from 'moment';
import * as nodemailer from 'nodemailer';
import { OTP_TYPE, RESPONSE_MESSAGER, USER_TYPE } from 'src/common/constants/enum';
import { UserRepository } from '../user/user.repository';
import { FilterOtpDto } from './dtos/filter.dto';
import { CreateOtpDto } from './dtos/otp.dto';
import { OtpRepository } from './otp.repository';
import { GenerateNumber } from 'src/common/utils/function-util';

@Injectable()
export class OtpService {
  constructor() {}

  public async create(dto: CreateOtpDto) {
    const record = await UserRepository.findOneBy({
      identifier: dto?.identifier,
      type: dto.userType,
    });

    if (dto?.type == OTP_TYPE.REGISTER && record) throw new ConflictException();

    if (dto?.type == OTP_TYPE.FORGOT && !record) throw new NotFoundException();

    const otp = await GenerateNumber(6);
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

    const findOtp = await OtpRepository.findOne({
      where: { identifier: dto?.identifier, used: false },
      order: { createdOnDate: 'DESC' },
    });

    if (findOtp) {
      const difference = moment().diff(moment(findOtp.createdOnDate), 'minutes');
      if (+difference < 5) {
        throw new BadRequestException('LIMITED_TIME');
      }
    }

    try {
      await Promise.all([
        transporter.sendMail({
          from: `Mã xác nhận OTP <${process.env.GOOGLE_USER}>`,
          to: dto?.identifier,
          subject: 'Mã OTP code',
          html: `<b>Mã OTP của bạn là: ${otp}. Vui lòng bảo mật mã OTP của bạn!</b>`,
        }),
        OtpRepository.insert({
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
      const findOtp = await OtpRepository.findOne({
        where: {
          identifier: dto?.identifier,
          // code: dto?.code,
          used: false,
        },
        order: { createdOnDate: 'DESC' },
      });

      if (!findOtp) throw new NotFoundException();

      if (findOtp?.code !== dto?.code) throw new BadRequestException('OTP_MISMATCH');

      if (isBefore(findOtp.expired, new Date())) throw new BadRequestException('OTP_EXPIRED');

      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
