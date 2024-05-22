import dataSource from 'src/database/data-source';
import { Banner } from 'src/database/entities/banner.entity';

export const BannerRepository = dataSource.getRepository(Banner).extend({});
