const ua = typeof window == 'undefined' ? '' : navigator.userAgent

export const isIpad = /ipad/i.test(ua)

export const isMac = /macintosh/i.test(ua)

export const isIphone = /iphone/i.test(ua)

export const isAndroid = /android/i.test(ua)

export const isWindows = /windows/i.test(ua)
