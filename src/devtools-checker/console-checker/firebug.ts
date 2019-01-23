import { DevtoolsChecker, DevtoolsDetail } from '../devtools-checker';
declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    Firebug: {
      chrome: {
        isInitialized: boolean;
      };
    };
  }
}

const firebugChecker: DevtoolsChecker = {
  name: 'firebug-checker',
  async getDevtoolsDetail() {
    const isOpen =
      window.Firebug &&
      window.Firebug.chrome &&
      window.Firebug.chrome.isInitialized;
    return {
      isOpen,
      checkerName: this.name
    };
  }
};

export default firebugChecker;
