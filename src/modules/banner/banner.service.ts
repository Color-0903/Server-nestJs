import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BannerRepository } from './banner.repository';
import { CreateBannerDto, UpdateBannerDto } from './dtos/banner';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class BannerService {
  constructor(private assetService: AssetService) {}

  public async create(dto: CreateBannerDto) {
    try {
      return await BannerRepository.save(dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateBannerDto) {
    const findById = await BannerRepository.findOne({
      where: { id },
      relations: { asset: true },
    });
    if (!findById) throw new NotFoundException();

    if (dto?.asset?.id !== findById?.assetId) {
      await this.assetService.delete(findById?.asset?.source, findById?.assetId);
    }

    try {
      await BannerRepository.save({ id, ...dto });
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // public async delete(id: string) {
  //   try {
  //     const findBanner = await BannerRepository.findOneBy({ id });
  //     if (!findBanner) throw new NotFoundException();

  //     await BannerRepository.delete(id);
  //     return {
  //       result: RESPONSE_MESSAGER.SUCCESS,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error);
  //   }
  // }
}
