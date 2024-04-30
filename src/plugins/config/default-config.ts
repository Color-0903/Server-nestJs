import { DefaultPasswordValidationStrategy } from '../../modules/auth/strategies/default-password-validation-strategy';
import { HashedAssetNamingStrategy } from '../asset/hashed-asset-naming-strategy';
import { DefaultAssetImportStrategy } from './asset-import-strategy/default-asset-import-strategy';
import { NoAssetStorageStrategy } from './asset-storage-strategy/no-asset-storage-strategy';
import { RuntimeVendureConfig } from './vendure-config';

/**
 * @description
 * The default configuration settings which are used if not explicitly overridden in the bootstrap() call.
 *
 * @docsCategory configuration
 */
export const defaultConfig: RuntimeVendureConfig = {
  authOptions: {
    disableAuth: true,
    requireVerification: false,
    verificationTokenDuration: 30,
    passwordValidationStrategy: new DefaultPasswordValidationStrategy({ minLength: 4 }),
  },
  importExportOptions: {
    importAssetsDir: __dirname,
    assetImportStrategy: new DefaultAssetImportStrategy(),
  },
  assetOptions: {
    assetNamingStrategy: new HashedAssetNamingStrategy(),
    assetStorageStrategy: new NoAssetStorageStrategy(),
    permittedFileTypes: ['image/*', 'video/*', 'audio/*', '.docx', '.xlsx', '.pdf'],
    uploadMaxFileSize: 20971520,
  },
};
