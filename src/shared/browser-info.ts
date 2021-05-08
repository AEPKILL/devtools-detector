const ua = navigator.userAgent;

/** firefox */
export const isFirefox = /firefox/i.test(ua);

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
