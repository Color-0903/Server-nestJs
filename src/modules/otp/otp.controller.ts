import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterOtpDto } from './dtos/filter.dto';
import { CreateOtpDto } from './dtos/otp.dto';
import { OtpService } from './otp.service';

@ApiTags('otp')
@Controller('otp')
@ApiBearerAuth()
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('send-otp')
  public async sendOtp(@Body() dto: CreateOtpDto) {
    return this.otpService.create(dto);
  }

  @Post('verify-otp')
  public async verifyOtp(@Body() dto: FilterOtpDto) {
    return this.otpService.verify(dto);
  }
}
