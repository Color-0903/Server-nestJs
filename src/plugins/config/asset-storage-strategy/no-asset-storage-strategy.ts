import { Request } from 'express';
import { Stream } from 'stream';

import { AssetStorageStrategy } from './asset-storage-strategy';
import { InternalServerErrorException } from '@nestjs/common';

const errorMessage = 'error.no-asset-storage-strategy-configured';

/**
 * A placeholder strategy which will simply throw an error when used.
 */
export class NoAssetStorageStrategy implements AssetStorageStrategy {
  writeFileFromStream(fileName: string, data: Stream): Promise<string> {
    throw new InternalServerErrorException(errorMessage);
  }

  writeFileFromBuffer(fileName: string, data: Buffer): Promise<string> {
    throw new InternalServerErrorException(errorMessage);
  }

  readFileToBuffer(identifier: string): Promise<Buffer> {
    throw new InternalServerErrorException(errorMessage);
  }

  readFileToStream(identifier: string): Promise<Stream> {
    throw new InternalServerErrorException(errorMessage);
  }

  deleteFile(identifier: string): Promise<void> {
    throw new InternalServerErrorException(errorMessage);
  }

  toAbsoluteUrl(request: Request, identifier: string): string {
    throw new InternalServerErrorException(errorMessage);
  }

  fileExists(fileName: string): Promise<boolean> {
    throw new InternalServerErrorException(errorMessage);
  }
}
