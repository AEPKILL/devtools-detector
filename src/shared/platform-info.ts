const ua = typeof window == 'undefined' ? '' : navigator.userAgent

export const isMobile = /mobile/i.test(ua)
