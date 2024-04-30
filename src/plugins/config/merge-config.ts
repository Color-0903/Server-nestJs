import { PartialVendureConfig } from './vendure-config';
import { VendureConfig } from './vendure-config';

/**
 * @description
 * Performs a deep merge of two VendureConfig objects. Unlike `Object.assign()` the `target` object is
 * not mutated, instead the function returns a new object which is the result of deeply merging the
 * values of `source` into `target`.
 *
 * Arrays do not get merged, they are treated as a single value that will be replaced. So if merging the
 * `plugins` array, you must explicitly concatenate the array.
 *
 * @example
 * ```TypeScript
 * const result = mergeConfig(defaultConfig, {
 *   assetOptions: {
 *     uploadMaxFileSize: 5000,
 *   },
 *   plugins: [
 *     ...defaultConfig.plugins,
 *     MyPlugin,
 *   ]
 * };
 * ```
 *
 * @docsCategory configuration
 */
export function mergeConfig<T extends VendureConfig>(target: T, source: PartialVendureConfig, depth = 0): T {
  if (!source) {
    return target;
  }

  if (depth === 0) {
    target = simpleDeepClone(target);
  }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject((source as any)[key])) {
        if (!(target as any)[key]) {
          Object.assign(target as any, { [key]: {} });
        }
        if (!isClassInstance((source as any)[key])) {
          mergeConfig((target as any)[key], (source as any)[key], depth + 1);
        } else {
          (target as any)[key] = (source as any)[key];
        }
      } else {
        Object.assign(target, { [key]: (source as any)[key] });
      }
    }
  }
  return target;
}

export function simpleDeepClone<T extends string | number | any[] | object>(input: T): T {
  // if not array or object or is null return self
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  let output: any;
  let i: number | string;
  // handle case: array
  if (input instanceof Array) {
    let l;
    output = [] as any[];
    for (i = 0, l = input.length; i < l; i++) {
      output[i] = simpleDeepClone(input[i]);
    }
    return output;
  }
  if (isClassInstance(input)) {
    return input;
  }
  // handle case: object
  output = {};
  for (i in input) {
    if (input.hasOwnProperty(i)) {
      output[i] = simpleDeepClone((input as any)[i]);
    }
  }
  return output;
}

export function isClassInstance(item: any): boolean {
  // Even if item is an object, it might not have a constructor as in the
  // case when it is a null-prototype object, i.e. created using `Object.create(null)`.
  return isObject(item) && item.constructor && item.constructor.name !== 'Object';
}

export function isObject(item: any): item is object {
  return item && typeof item === 'object' && !Array.isArray(item);
}
