import { userAgent } from "./context";


export const isMac = /macintosh/i.test(userAgent);

export const isIpad = /ipad/i.test(userAgent) || (isMac && navigator.maxTouchPoints > 1);

export const isIphone = /iphone/i.test(userAgent);

export const isAndroid = /android/i.test(userAgent);

export const isWindows = /windows/i.test(userAgent);
