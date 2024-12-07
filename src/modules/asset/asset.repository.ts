import dataSource from 'src/database/data-source';
import { Asset } from 'src/database/entities/asset.entity';

export const AssetRepository = dataSource.getRepository(Asset).extend({});
