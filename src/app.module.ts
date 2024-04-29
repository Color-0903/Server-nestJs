import { Module } from '@nestjs/common';
import { dataSource } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './common/guards/authorization.guard';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRoot(dataSource),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionModule,
    },
  ],
})
export class AppModule {}
