import { Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectableStrategy } from '../../common/types/injectable-strategy';
import { Injector } from '../../common/types/injector';
import { ConfigModule } from '../../plugins/config/config.module';
import { ConfigService } from '../../plugins/config/config.service';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { InitializerService } from './initializer.service';

@Module({
  imports: [RoleModule, ConfigModule, UserModule],
  controllers: [],
  providers: [InitializerService],
})
export class InitializerModule implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(
    private configService: ConfigService,
    private moduleRef: ModuleRef,
  ) {}
  async onApplicationBootstrap() {
    await this.initInjectableStrategies();
  }

  async onApplicationShutdown(signal?: string) {
    await this.destroyInjectableStrategies();
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
    const { passwordValidationStrategy } = this.configService.authOptions;

    return [passwordValidationStrategy];
  }
}
