import { FnArguments } from '../types/utils.type';
import { getGlobalThis } from './utils';

const globalThis = getGlobalThis.call(null as any);

export const ua = (globalThis.navigator || {}).userAgent || '';

export function createElement(
  ...args: FnArguments<typeof document['createElement']>
): ReturnType<typeof document['createElement']> {
  if (globalThis.document) {
    return globalThis.document.createElement(...args);
  }

  return {} as any;
}
