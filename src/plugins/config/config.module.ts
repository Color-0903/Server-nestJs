import { Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { resetConfig } from './config-helpers';
import { ConfigService } from './config.service';
import { InjectableStrategy } from '../../common/types/injectable-strategy';
import { Injector } from '../../common/types/injector';
import { VerificationTokenGenerator } from './services/verification-token-generator';

@Module({
  providers: [ConfigService, VerificationTokenGenerator],
  exports: [ConfigService, VerificationTokenGenerator],
})
export class ConfigModule implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(
    private configService: ConfigService,
    private moduleRef: ModuleRef,
  ) {}

  async onApplicationBootstrap() {
    await this.initInjectableStrategies();
  }

  async onApplicationShutdown(signal?: string) {
    await this.destroyInjectableStrategies();
    /**
     * When the application shuts down, we reset the activeConfig to the default. Usually this is
     * redundant, as the app shutdown would normally coincide with the process ending. However, in some
     * circumstances, such as when running migrations immediately followed by app bootstrap, the activeConfig
     * will persist between these two applications and mutations e.g. to the CustomFields will result in
     * hard-to-debug errors. So resetting is a precaution against this scenario.
     */
    resetConfig();
  }

  private async initInjectableStrategies() {
    const injector = new Injector(this.moduleRef);
    for (const strategy of this.getInjectableStrategies()) {
      if (typeof strategy.init === 'function') {
        await strategy.init(injector);
      }
    }
  }

  private async destroyInjectableStrategies() {
    for (const strategy of this.getInjectableStrategies()) {
      if (typeof strategy.destroy === 'function') {
        await strategy.destroy();
      }
    }
  }

  private getInjectableStrategies(): InjectableStrategy[] {
    const { assetNamingStrategy, assetStorageStrategy } = this.configService.assetOptions;
    return [assetNamingStrategy, assetStorageStrategy];
  }
}
