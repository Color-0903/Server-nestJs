import { Module } from '@nestjs/common';
import dataSource from './data-source';

const dbDataProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];

@Module({
  providers: [...dbDataProvider],
  exports: [...dbDataProvider],
})
export class DbDataModule {}
