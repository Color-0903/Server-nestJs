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
  async getDistrict(@Query('provinceId') provinceId: string) {
    const province = await CadastralRepository.findOneBy({ id: provinceId });
    return await CadastralRepository.find({
      where: {
        cityCode: province?.baseCode,
        type: 'district',
      },
    });
  }

  @Get('wards')
  async getWard(@Query('districtId') districtId: string) {
    const district = await CadastralRepository.findOneBy({ id: districtId });
    return await CadastralRepository.find({
      where: {
        districtCode: district?.baseCode,
        type: 'ward',
      },
    });
  }
}
