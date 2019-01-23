export const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
export const isIE =
  // ie 11+
  navigator.userAgent.indexOf('Trident') > -1 ||
  // other ie browser
  navigator.userAgent.indexOf('MSIE') > -1;

export const isEdge = navigator.userAgent.indexOf('Edge') > -1;

// edge 的 userAgent 包含 chrome
// -> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299
export const isChrome = navigator.userAgent.indexOf('Chrome') > -1 && !isEdge;
