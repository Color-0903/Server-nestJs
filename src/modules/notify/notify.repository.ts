import dataSource from 'src/database/data-source';
import { Notify } from 'src/database/entities/notify.entity';

export const NotifyRepository = dataSource.getRepository(Notify).extend({});
