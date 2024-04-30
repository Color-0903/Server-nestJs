import { Type } from '@nestjs/common';
import { PasswordValidationStrategy } from '../../modules/auth/strategies/password-validation-strategy';
import { AssetImportStrategy } from './asset-import-strategy/asset-import-strategy';
import { AssetStorageStrategy } from './asset-storage-strategy/asset-storage-strategy';
import { AssetNamingStrategy } from './asset-naming-strategy/asset-naming-strategy';

/**
 * @description
 * The AuthOptions define how authentication and authorization is managed.
 *
 * @docsCategory auth
 * */
export interface AuthOptions {
  /**
   * @description
   * Disable authentication & permissions checks.
   * NEVER set the to true in production. It exists
   * only to aid certain development tasks.
   *
   * @default false
   */
  disableAuth?: boolean;
  /**
   * @description
   * Determines whether new User accounts require verification of their email address.
   *
   * If set to "true", when registering via the `registerCustomerAccount` mutation, one should *not* set the
   * `password` property - doing so will result in an error. Instead, the password is set at a later stage
   * (once the email with the verification token has been opened) via the `verifyCustomerAccount` mutation.
   *
   * @default true
   */
  requireVerification?: boolean;
  /**
   * @description
   * Sets the length of time that a verification token is valid for, after which the verification token must be refreshed.
   *
   * Expressed in seconds
   *
   * @default 30
   */
  verificationTokenDuration?: number;
  /**
   * @description
   * Allows you to set a custom policy for passwords when using the {@link NativeAuthenticationStrategy}.
   * By default, it uses the {@link DefaultPasswordValidationStrategy}, which will impose a minimum length
   * of four characters. To improve security for production, you are encouraged to specify a more strict
   * policy, which you can do like this:
   *
   * @example
   * ```ts
   * {
   *   passwordValidationStrategy: new DefaultPasswordValidationStrategy({
   *     // Minimum eight characters, at least one letter and one number
   *     regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
   *   }),
   * }
   * ```
   */
  passwordValidationStrategy?: PasswordValidationStrategy;
}

/**
 * @description
 * The AssetOptions define how assets (images and other files) are named and stored, and how preview images are generated.
 *
 * **Note**: If you are using the `AssetServerPlugin`, it is not necessary to configure these options.
 *
 * @docsCategory assets
 * */
export interface AssetOptions {
  /**
   * @description
   * Defines how asset files and preview images are named before being saved.
   *
   * @default DefaultAssetNamingStrategy
   */
  assetNamingStrategy?: AssetNamingStrategy;
  /**
   * @description
   * Defines the strategy used for storing uploaded binary files.
   *
   * @default NoAssetStorageStrategy
   */
  assetStorageStrategy?: AssetStorageStrategy;
  /**
   * @description
   * An array of the permitted file types that may be uploaded as Assets. Each entry
   * should be in the form of a valid
   * [unique file type specifier](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)
   * i.e. either a file extension (".pdf") or a mime type ("image/*", "audio/mpeg" etc.).
   *
   * @default image, audio, video MIME types plus PDFs
   */
  permittedFileTypes?: string[];
  /**
   * @description
   * The max file size in bytes for uploaded assets.
   *
   * @default 20971520
   */
  uploadMaxFileSize?: number;
}

/**
 * @description
 * Options related to importing & exporting data.
 *
 * @docsCategory import-export
 */
export interface ImportExportOptions {
  /**
   * @description
   * The directory in which assets to be imported are located.
   *
   * @default __dirname
   */
  importAssetsDir?: string;
  /**
   * @description
   * This strategy determines how asset files get imported based on the path given in the
   * import CSV or via the {@link AssetImporter} `getAssets()` method.
   *
   * @since 1.7.0
   */
  assetImportStrategy?: AssetImportStrategy;
}

/**
 * @description
 * All possible configuration options are defined by the
 * [`VendureConfig`](https://github.com/vendure-ecommerce/vendure/blob/master/server/src/config/vendure-config.ts) interface.
 *
 * @docsCategory configuration
 * */
export interface VendureConfig {
  /**
   * @description
   * Configuration for authorization.
   */
  authOptions: AuthOptions;
  /**
   * @description
   * Configuration settings for data import and export.
   */
  importExportOptions?: ImportExportOptions;
}

/**
 * @description
 * This interface represents the VendureConfig object available at run-time, i.e. the user-supplied
 * config values have been merged with the {@link defaultConfig} values.
 *
 * @docsCategory configuration
 */
export interface RuntimeVendureConfig extends Required<VendureConfig> {
  authOptions: Required<AuthOptions>;
  assetOptions: Required<AssetOptions>;
  importExportOptions: Required<ImportExportOptions>;
}

type DeepPartialSimple<T> = {
  [P in keyof T]?:
    | null
    | (T[P] extends Array<infer U>
        ? Array<DeepPartialSimple<U>>
        : T[P] extends ReadonlyArray<infer X>
          ? ReadonlyArray<DeepPartialSimple<X>>
          : T[P] extends Type<any>
            ? T[P]
            : DeepPartialSimple<T[P]>);
};

export type PartialVendureConfig = DeepPartialSimple<VendureConfig>;
