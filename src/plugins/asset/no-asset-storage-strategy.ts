import { Request } from 'express';
import { Stream } from 'stream';
import { AssetStorageStrategy } from '../config/asset-storage-strategy/asset-storage-strategy';

const errorMessage = 'error.no-asset-storage-strategy-configured';

/**
 * A placeholder strategy which will simply throw an error when used.
 */
export class NoAssetStorageStrategy implements AssetStorageStrategy {
  writeFileFromStream(fileName: string, data: Stream): Promise<string> {
    throw new Error(errorMessage);
  }

  writeFileFromBuffer(fileName: string, data: Buffer): Promise<string> {
    throw new Error(errorMessage);
  }

  readFileToBuffer(identifier: string): Promise<Buffer> {
    throw new Error(errorMessage);
  }

  readFileToStream(identifier: string): Promise<Stream> {
    throw new Error(errorMessage);
  }

  deleteFile(identifier: string): Promise<void> {
    throw new Error(errorMessage);
  }

  toAbsoluteUrl(request: Request, identifier: string): string {
    throw new Error(errorMessage);
  }

  fileExists(fileName: string): Promise<boolean> {
    throw new Error(errorMessage);
  }
}
