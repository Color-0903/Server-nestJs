import { AssetNamingStrategy } from '../config/asset-naming-strategy/asset-naming-strategy';
import { normalizeString } from '../../common/utils/function-util';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export class S3NamingStrategy implements AssetNamingStrategy {
  private readonly numberingRe: RegExp = /__(\d+)(\.[^.]+)?$/;

  generateSourceFileName(originalFileName: string, conflictFileName?: string): string {
    let normalized: string = normalizeString(originalFileName, '-');
    if (!conflictFileName) {
      return normalized;
    } else {
      return this.incrementOrdinalSuffix(normalized, conflictFileName);
    }
  }

  generatePreviewFileName(sourceFileName: string, conflictFileName?: string): string {
    const previewSuffix: string = '__preview';
    const previewFileName: string = this.isSupportedImageFormat(sourceFileName)
      ? this.addSuffix(sourceFileName, previewSuffix)
      : this.addSuffix(sourceFileName, previewSuffix) + '.png';
    const normalized: string = normalizeString(previewFileName, '-');
    if (!conflictFileName) {
      return normalized;
    } else {
      return this.incrementOrdinalSuffix(normalized, conflictFileName);
    }
  }

  private isSupportedImageFormat(fileName: string): boolean {
    const imageExtensions: string[] = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif', '.gif'];
    const ext: string = path.extname(fileName);
    return imageExtensions.includes(ext);
  }

  private incrementOrdinalSuffix(baseFileName: string, conflictFileName: string): string {
    const matches: RegExpMatchArray = conflictFileName.match(this.numberingRe);
    const ord: number = Number(matches && matches[1]) || 1;
    return this.addOrdinalSuffix(baseFileName, ord + 1);
  }

  private addOrdinalSuffix(fileName: string, order: number): string {
    const paddedOrder: string = order.toString(10).padStart(2, '0');
    return this.addSuffix(fileName, `__${paddedOrder}`);
  }

  private addSuffix(fileName: string, suffix: string): string {
    const ext: string = path.extname(fileName);
    const baseName: string = path.basename(fileName, ext);
    return `${baseName}${suffix}${ext}`;
  }
}
