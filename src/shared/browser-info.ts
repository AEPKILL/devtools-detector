import { userAgent } from './browser-context';
import { getGlobalThis } from './utils';

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

/** chrome */
export const isChrome =
  typeof globalThis?.window?.chrome !== 'undefined' ||
  /chrome/i.test(userAgent);

/** safari */
export const isSafari =
  (globalThis?.window?.safari?.pushNotification || false).toString() ===
    '[object SafariRemoteNotification]' ||
  (/safari/i.test(userAgent) && !isChrome);
