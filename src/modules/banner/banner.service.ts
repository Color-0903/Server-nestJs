import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { BannerRepository } from './banner.repository';
import { CreateBannerDto, UpdateBannerDto } from './dtos/banner';

@Injectable()
export class BannerService {
  constructor() {}

  public async create(dto: CreateBannerDto) {
    try {
      return await BannerRepository.save(dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateBannerDto) {
    try {
      await BannerRepository.update(id, dto);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string) {
    try {
      const findBanner = await BannerRepository.findOneBy({ id });
      if (!findBanner) throw new NotFoundException();

      await BannerRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
