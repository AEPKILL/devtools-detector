declare global {
  interface Window {
    // Chrome
    chrome?: unknown,
    // Firefox
    InstallTrigger?: unknown
    // Safari
    safari?: {
      pushNotification: () => void;
    }
  }
}

const ua = navigator.userAgent;

/** firefox */
export const isFirefox = ('InstallTrigger' in window) || /firefox/i.test(ua);

/** ie */
export const isIE =
  // ie 11+
  /trident/i.test(ua) ||
  // other ie browser
  /msie/i.test(ua);

/** edge */
export const isEdge = /edge/i.test(ua);

/** webkit */
export const isWebkit = /webkit/i.test(ua) && !isEdge;

/** chrome */
export const isChrome = typeof window.chrome !== 'undefined' || /chrome/i.test(ua);

/** safari */
export const isSafari = (window.safari?.pushNotification || false).toString() === '[object SafariRemoteNotification]' || /safari/i.test(ua) && !isChrome;
