import { userAgent } from "./browser-context";


export const isIpad = /ipad/i.test(userAgent);

export const isMac = /macintosh/i.test(userAgent);

export const isIphone = /iphone/i.test(userAgent);

export const isAndroid = /android/i.test(userAgent);

export const isWindows = /windows/i.test(userAgent);
