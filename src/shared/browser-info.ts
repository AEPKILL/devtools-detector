declare global {
  interface Window {
    // Chrome
    chrome?: unknown
    // Firefox
    InstallTrigger?: unknown
    // Safari
    safari?: {
      pushNotification: () => void
    }
  }
}

const isInSSR = typeof window == 'undefined'
const ua = !isInSSR ? navigator.userAgent : ''

/** firefox */
export const isFirefox = !isInSSR
  ? 'InstallTrigger' in window || /firefox/i.test(ua)
  : false

/** ie */
export const isIE = !isInSSR
  ? // ie 11+
    /trident/i.test(ua) ||
    // other ie browser
    /msie/i.test(ua)
  : false

/** edge */
export const isEdge = isInSSR ? false : /edge/i.test(ua)

/** webkit */
export const isWebkit = isInSSR ? false : /webkit/i.test(ua) && !isEdge

/** chrome */
export const isChrome = isInSSR
  ? false
  : typeof window.chrome !== 'undefined' || /chrome/i.test(ua)

/** safari */
export const isSafari = isInSSR
  ? false
  : (window.safari?.pushNotification || false).toString() ===
      '[object SafariRemoteNotification]' ||
    (/safari/i.test(ua) && !isChrome)
