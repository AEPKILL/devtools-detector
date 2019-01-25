import layzFunction from './lazy-function';
const ua = navigator.userAgent;
export const isFirefox = layzFunction(() => ua.indexOf('Firefox') > -1);
export const isIE = layzFunction(
  () =>
    // ie 11+
    ua.indexOf('Trident') > -1 ||
    // other ie browser
    ua.indexOf('MSIE') > -1
);

export const isEdge = layzFunction(() => ua.indexOf('Edge') > -1);

// edge 的 userAgent 包含 chrome
// -> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299
export const isWebkit = layzFunction(() => /webkit/i.test(ua) && !isEdge());
