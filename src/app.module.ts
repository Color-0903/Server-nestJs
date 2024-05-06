import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { dataSource } from './database/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ColorModule } from './modules/color/color.module';
import { InitializerModule } from './modules/initializer/initializer.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { SizeModule } from './modules/size/size.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { AssetModule } from './modules/asset/asset.module';

@Module({
  imports: [
    InitializerModule,
    CommonModule,
    TypeOrmModule.forRoot(dataSource),
    AuthModule,
    UserModule,
    ColorModule,
    CategoryModule,
    SizeModule,
    ProductModule,
    RoleModule,
    AssetModule,
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
