export const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
export const isIE =
  // edge
  navigator.userAgent.indexOf('Edge') >= -1 ||
  // ie11+
  navigator.userAgent.indexOf('Trident') > -1 ||
  // other ie browser
  navigator.userAgent.indexOf('MSIE') > -1;
