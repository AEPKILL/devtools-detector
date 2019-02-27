import layzFunction from './lazy-function';
export const isInIframe = layzFunction(() => window.top !== window);
export const isInCorsIframe = layzFunction(() => {
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
