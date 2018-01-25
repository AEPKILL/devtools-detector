declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    Firebug: any;
  }
}
export function hasFirebug() {
  return window.Firebug && window.Firebug.chrome;
}

export function firebugIsOpen() {
  return window.Firebug.chrome.isInitialized;
}

export default {
  hasFirebug,
  firebugIsOpen
};
