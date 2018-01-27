declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    Firebug: any;
  }
}

export function firebugIsOpen() {
  return (
    window.Firebug &&
    window.Firebug.chrome &&
    window.Firebug.chrome.isInitialized
  );
}

export default {
  firebugIsOpen
};
