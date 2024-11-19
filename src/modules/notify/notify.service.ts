import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import {
  CreateNotifyDto
} from './dtos/notify';
import { NotifyRepository } from './notify.repository';
// import { GenerateQrCode } from 'src/common/services/qrCode';

@Injectable()
export class NotifyService {
  constructor() {}

  public async create(dto: CreateNotifyDto, userId: string) {
    try {
      return await NotifyRepository.save({ ...dto, userId });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
