import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsNull } from 'typeorm';
import { CadastralRepository } from './cadastral.repository';

@ApiTags('cadastral')
@Controller('cadastral')
@ApiBearerAuth()
export class CadastralController {
  constructor() {}

  @Get('province')
  async getProvince() {
    return await CadastralRepository.find({
      where: {
        type: 'province',
      },
    });
  }

  @Get('districts')
  async getDistrict(@Query('cityCode') cityCode: string) {
    return await CadastralRepository.find({
      where: {
        cityCode: cityCode,
      },
    });
  }

  @Get('wards')
  async getWard(@Query('districtCode') districtCode: string) {
    return await CadastralRepository.find({
      where: {
        districtCode: districtCode,
      },
    });
  }
}
