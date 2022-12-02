import { getGlobalThis } from './utils';
import { FnArguments } from '../types/utils.type';

const globalThis = getGlobalThis();

declare global {
  interface Window {
    // Chrome
    chrome?: unknown;
    // Firefox
    InstallTrigger?: unknown;
    // Safari
    safari?: {
      pushNotification: () => void;
    };
  }
}

export const userAgent = globalThis?.navigator?.userAgent || 'unknown';

/** firefox */
export const isFirefox =
  'InstallTrigger' in (globalThis?.window || {}) || /firefox/i.test(userAgent);

/** ie */
export const isIE =
  // ie 11+
  /trident/i.test(userAgent) ||
  // other ie browser
  /msie/i.test(userAgent);

/** edge */
export const isEdge = /edge/i.test(userAgent);

/** webkit */
export const isWebkit = /webkit/i.test(userAgent) && !isEdge;

export const isIqiyiApp = /IqiyiApp/.test(userAgent);

/** chrome */
export const isChrome =
  typeof globalThis?.window?.chrome !== 'undefined' ||
  /chrome/i.test(userAgent) ||
  // chrome iOS
  /CriOS/i.test(userAgent);

/** safari */
export const isSafari =
  (globalThis?.window?.safari?.pushNotification || false).toString() ===
    '[object SafariRemoteNotification]' ||
  (/safari/i.test(userAgent) && !isChrome);

export function createElement(
  ...args: FnArguments<typeof document['createElement']>
): ReturnType<typeof document['createElement']> {
  if (globalThis?.document) {
    return globalThis.document.createElement(...args);
  }

  return {} as any;
}

export const inBrowser =
  typeof globalThis.document?.createElement === 'function';
