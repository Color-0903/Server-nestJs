import { Injectable, Logger } from '@nestjs/common';
import { isNil } from 'lodash';
import * as mime from 'mime-types';
import { getAssetType } from 'src/common/utils/function-util';
import { Asset } from 'src/database/entities/asset.entity';
import { Readable, Stream } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { AssetType } from '../../common/constants/enum';
import { ConfigService } from '../../plugins/config/config.service';
const sizeOf = require('image-size');

@Injectable()
export class AssetService {
  private permittedMimeTypes: Array<{ type: string; subtype: string }> = [];

  constructor(private configService: ConfigService) {
    this.permittedMimeTypes = this.configService.assetOptions.permittedFileTypes
      .map((val) => (/\.[\w]+/.test(val) ? mime.lookup(val) || undefined : val))
      .filter((val) => !isNil(val))
      .map((val) => {
        const [type, subtype] = val.split('/');
        return { type, subtype };
      });

  }

  async create(file: Express.Multer.File) {
    return new Promise(async (resolve, reject) => {
      let { buffer, originalname: filename, mimetype } = file;

      const prefix = Date.now() + '-' + uuidv4();
      const suffixes = mimetype.split('/')[1] || 'png';

      filename = `${prefix}.${suffixes}`;

      const stream = Readable.from(buffer);
      stream.on('error', (err: any) => {
        reject(err);
      });
      let result: any;
      try {
        result = await this.createAssetInternal(stream, filename, mimetype);
      } catch (e) {
        reject(e);
        return;
      }
      resolve(result);
    });
  }

  private async createAssetInternal(stream: Stream, filename: string, mimetype: string) {
    const { assetOptions } = this.configService;
    if (!this.validateMimeType(mimetype)) {
      throw new Error('MimeTypeError');
    }
    const { assetStorageStrategy } = assetOptions;
    let sourceFileName = await this.getSourceFileName(filename);
    const sourceFileIdentifier = await assetStorageStrategy.writeFileFromStream(sourceFileName, stream, mimetype);
    const sourceFile = await assetStorageStrategy.readFileToBuffer(sourceFileIdentifier);

    const type = getAssetType(mimetype);
    const { width, height } = type === AssetType.IMAGE ? this.getDimensions(sourceFile) : { width: 0, height: 0 };

    const asset = new Asset();
    Object.assign(asset, {
      source: sourceFileIdentifier,
      type: type,
      width: width,
      height: height,
      mineType: mimetype,
    });
    // return this.baseService.create(asset);
  }

  private getDimensions(imageFile: Buffer): { width: number; height: number } {
    try {
      const { width, height } = sizeOf(imageFile);
      return { width, height };
    } catch (e) {
      Logger.error(`Could not determine Asset dimensions: ` + e);
      return { width: 0, height: 0 };
    }
  }
  private validateMimeType(mimeType: string): boolean {
    const [type, subtype] = mimeType.split('/');
    const typeMatches = this.permittedMimeTypes.filter((t) => t.type === type);

    for (const match of typeMatches) {
      if (match.subtype === subtype || match.subtype === '*') {
        return true;
      }
    }
    return false;
  }

  private async getSourceFileName(fileName: string): Promise<string> {
    const { assetOptions } = this.configService;
    return this.generateUniqueName(fileName, (name, conflict) =>
      assetOptions.assetNamingStrategy.generateSourceFileName(name, conflict),
    );
  }

  private async getPreviewFileName(fileName: string): Promise<string> {
    const { assetOptions } = this.configService;
    return this.generateUniqueName(fileName, (name, conflict) =>
      assetOptions.assetNamingStrategy.generatePreviewFileName(name, conflict),
    );
  }

  private async generateUniqueName(
    inputFileName: string,
    generateNameFn: (fileName: string, conflictName?: string) => string,
  ): Promise<string> {
    const { assetOptions } = this.configService;
    let outputFileName: string | undefined;
    do {
      outputFileName = generateNameFn(inputFileName, outputFileName);
    } while (await assetOptions.assetStorageStrategy.fileExists(outputFileName));
    return outputFileName;
  }
}
