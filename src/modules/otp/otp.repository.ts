import dataSource from 'src/database/data-source';
import { Otp } from 'src/database/entities/otp.entity';

export const OtpRepository = dataSource.getRepository(Otp).extend({});
