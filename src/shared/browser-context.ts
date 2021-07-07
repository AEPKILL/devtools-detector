import { FnArguments } from '../types/utils.type';
import { getGlobalThis } from './utils';

const globalThis = getGlobalThis();

export function createElement(
  ...args: FnArguments<typeof document['createElement']>
): ReturnType<typeof document['createElement']> {
  if (globalThis?.document) {
    return globalThis.document.createElement(...args);
  }

  return {} as any;
}

export const userAgent = globalThis?.navigator?.userAgent || 'xxxxx';
