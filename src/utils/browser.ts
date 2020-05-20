import lazyFunction from './lazy-function';
const ua = navigator.userAgent;
export const isFirefox = lazyFunction(() => ua.indexOf('Firefox') > -1);
export const isIE = lazyFunction(
  () =>
    // ie 11+
    ua.indexOf('Trident') > -1 ||
    // other ie browser
    ua.indexOf('MSIE') > -1
);

export const isEdge = lazyFunction(() => ua.indexOf('Edge') > -1);

// edge 的 userAgent 包含 chrome
// -> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299
export const isWebkit = lazyFunction(() => /webkit/i.test(ua) && !isEdge());
