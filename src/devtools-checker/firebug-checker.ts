import { DevtoolsChecker } from './devtools-checker';

declare global {
  interface Window {
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
      checkerName: this.name,
      directReturn: true
    };
  }
};

export default firebugChecker;
