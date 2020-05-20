import { isInCorsIframe } from '../utils/context';
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
    const top = window.top;
    let isOpen: boolean = false;
    try {
      isOpen =
        top.Firebug && top.Firebug.chrome && top.Firebug.chrome.isInitialized;
    } catch {
      /** nothing to do */
    }
    return {
      isOpen,
      checkerName: this.name
    };
  },
  async skip() {
    return isInCorsIframe();
  }
};

export default firebugChecker;
