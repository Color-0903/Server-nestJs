import { Injectable, Logger } from '@nestjs/common';
import { AssetOptions, AuthOptions, ImportExportOptions, RuntimeVendureConfig, VendureConfig } from './vendure-config';
import { getConfig } from './config-helpers';

@Injectable()
export class ConfigService implements VendureConfig {
  private activeConfig: RuntimeVendureConfig;

  constructor() {
    this.activeConfig = getConfig();
    if (this.activeConfig.authOptions.disableAuth) {
      // tslint:disable-next-line
      Logger.warn('Auth has been disabled. This should never be the case for a production system!');
    }
  }

  get authOptions(): Required<AuthOptions> {
    return this.activeConfig.authOptions;
  }

  get importExportOptions(): Required<ImportExportOptions> {
    return this.activeConfig.importExportOptions;
  }

  get assetOptions(): Required<AssetOptions> {
    return this.activeConfig.assetOptions;
  }
}
