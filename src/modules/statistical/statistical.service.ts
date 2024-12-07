import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Between } from 'typeorm';
import { VoucherHistoryRepository } from '../voucher/voucher.repository';

@Injectable()
export class StatisticalService {
  constructor() {}

  private getLast12Months() {
    const months = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = monthDate.getMonth() + 1;
      const year = monthDate.getFullYear();
      months.unshift({ name: `T ${month}/${year}`, 'Voucher được kích hoạt': 0, monthDate });
    }

    return months;
  }

  private calcStatistical(inputs: any[]) {
    const data: any = this.getLast12Months() as any;
    data.forEach((_item, _index) => {
      inputs.forEach((item) => {
        const currentMonth = moment(item?.createdOnDate).month();
        if (moment(_item['monthDate']).month() != currentMonth)
          data[_index]['Voucher được kích hoạt'] = data[_index]['Voucher được kích hoạt'];
        else data[_index]['Voucher được kích hoạt'] = +data[_index]['Voucher được kích hoạt'] + 1;
      });
    });

    return data;
  }

  public async partner(userId: string) {
    const from = moment().subtract(12, 'months').toDate();
    const to = moment().endOf('month').toDate();

    const [voucherActivates] = await Promise.all([
      VoucherHistoryRepository.find({
        where: {
          createdOnDate: Between(from, to),
        },
      }),
    ]);
    if (!voucherActivates?.length) return [];

    return this.calcStatistical(voucherActivates);
    // return await SizeRepository.getAll(filter);
  }
}
