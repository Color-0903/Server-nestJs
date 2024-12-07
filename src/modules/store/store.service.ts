import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterStoreDto } from './dtos/filter.dto';
import { CreateStoreDto, UpdateStoreDto } from './dtos/store';
import { StoreRepository } from './store.repository';
import { RESPONSE_MESSAGER, STORE_STATUS } from 'src/common/constants/enum';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class StoreService {
  constructor(private assetService: AssetService) {}

  public async getAll(filter: FilterStoreDto) {
    return await StoreRepository.getAll(filter);
  }

  public async create(dto: CreateStoreDto, userId: string) {
    try {
      const count = StoreRepository.count({ where: { userId, status: STORE_STATUS.PENDING } });
      if (+count > 3) throw new BadRequestException('STORE_PENDING_EXIST');
      return await StoreRepository.save({ ...dto, userId });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateStoreDto, userId: string) {
    const find = await StoreRepository.findOne({
      where: { id, userId },
      relations: { asset: true, assets: true },
    });
    if (!find) throw new NotFoundException();

    try {
      const listAssets = dto?.assets?.map((item) => item?.id);
      const listOleAssets = find?.assets?.map((item) => item?.id);
      const listRemove = find?.assets
        ?.filter((item) => !listAssets.includes(item?.id) && item?.id != dto?.asset?.id)
        .map((item) => this.assetService.revemoveFile(item?.id, item?.source));

      if (
        find?.asset &&
        find?.asset?.id !== dto?.asset?.id &&
        !listOleAssets?.includes(dto?.asset?.id)
      ) {
        listRemove.push(this.assetService.revemoveFile(find?.asset?.id, find?.asset?.source));
      }

      if (!!listRemove?.length) {
        await Promise.all(listRemove);
      }

      await StoreRepository.save({ ...find, ...dto });
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string, userId: string) {
    try {
      const find = await StoreRepository.findOne({
        where: { id, userId },
        relations: ['asset', 'assets'],
      });
      if (!find) throw new NotFoundException();

      const removeAssetPromise = [...find?.assets, find?.asset]?.map(
        (item) => this.assetService?.revemoveFile(item?.id, item?.source),
      );
      if (!!removeAssetPromise?.length) await Promise.all(removeAssetPromise);

      await StoreRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
