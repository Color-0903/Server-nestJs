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
import { AssetServerPlugin } from './plugins/asset/asset.module';
import  * as path from 'path';
import { S3NamingStrategy } from './plugins/asset/s3-naming-strategy';
import { configureS3AssetStorage } from './plugins/asset/s3-asset-storage-strategy';
import { AuthorizationGuard } from './common/guards/authorization.guard';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRoot(dataSource),
    AuthModule,
    UserModule,
    ColorModule,
    CategoryModule,
    SizeModule,
    ProductModule,
    OrderModule,
    RoleModule,
    AssetModule,
    AssetServerPlugin.init({
      route: process.env.S3_FOLDER,
      assetUploadDir: path.join(__dirname, '../static/assets'),
      namingStrategy: new S3NamingStrategy(),
      // Configure if using S3 AWS
      storageStrategyFactory: configureS3AssetStorage({
        bucket: process.env.S3_BUCKET_NAME,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
      }),
    }),

    InitializerModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
