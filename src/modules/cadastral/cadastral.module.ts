import { Module } from '@nestjs/common';
import { AssetModule } from '../asset/asset.module';
import { CadastralService } from './cadastral.service';
import { CadastralController } from './cadastral.controller';

@Module({
  imports: [AssetModule],
  controllers: [CadastralController],
  providers: [CadastralService],
  exports: [CadastralService],
})
export class CadastralModule {}
