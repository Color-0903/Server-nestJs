import * as bcryptjs from 'bcryptjs';
import { format } from 'date-fns';
import { AssetType } from '../constants/enum';

export const hashPassword = async (password: string) => {
  const saltOrRounds = 10;
  const hash = await bcryptjs.hash(password, saltOrRounds);
  return hash;
};

export const generateFromDate = (fromDate: Date) => {
  const result = format(fromDate, 'yyyy-MM-dd');
  return result + ' 00:00:00';
};

export const generateToDate = (toDate: Date) => {
  const result = format(toDate, 'yyyy-MM-dd');
  return result + ' 23:59:00';
};

export function normalizeEmailAddress(input: string): string {
  return input.trim().toLowerCase();
}

export function getAssetType(mimeType: string): AssetType {
  const type = mimeType.split('/')[0];
  switch (type) {
    case 'image':
      return AssetType.IMAGE;
    case 'video':
      return AssetType.VIDEO;
    default:
      return AssetType.BINARY;
  }
}

/**
 * Normalizes a string to replace non-alphanumeric and diacritical marks with
 * plain equivalents.
 * Based on https://stackoverflow.com/a/37511463/772859
 */
export function normalizeString(input: string, spaceReplacer = ' '): string {
  return (input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[!"£$%^&*()+[\]{};:@#~?\\/,|><`¬'=‘’]/g, '')
    .replace(/\s+/g, spaceReplacer);
}


export function GenerateCode(length?: number) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@~&?";
  let code = "";
  for (let i = 0; i < (length ?? 3); i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      code += letters[randomIndex];
  }
  return code;
}

export function GenerateNumber(quantity: number) {
  quantity = quantity ? quantity : 6;
  let otpCode = '';
  for (let i = 0; i < quantity; i++) {
    otpCode += Math.floor(Math.random() * 10);
  }
  return otpCode.trim();
}
