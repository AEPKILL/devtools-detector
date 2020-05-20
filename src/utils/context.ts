import lazyFunction from './lazy-function';
export const isInIframe = lazyFunction(() => window.top !== window);
export const isInCorsIframe = lazyFunction(() => {
  if (!isInIframe()) {
    return false;
  }
  try {
    Object.keys(window.top.innerWidth);
    return false;
  } catch {
    return true;
  }
});
