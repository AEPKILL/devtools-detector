import { isFirefox } from '../../utils/browser';
import { clear, log } from '../../utils/console';
import debuggerChecker from '../debugger-checker';
import { DevtoolsChecker } from '../devtools-checker';

const reg = / /;
let isOpen = false;

reg.toString = () => {
  isOpen = true;
  alert(23333);
  return firefoxChecker.name;
};

const firefoxChecker: DevtoolsChecker = {
  name: 'firefox-checker',
  async getDevtoolsDetail() {
    isOpen = false;
    log('%c23333', reg);
    clear();
    if (isOpen === false) {
      const detail = await debuggerChecker.getDevtoolsDetail();
      detail.directReturn = true;
      return detail;
    }
    return {
      isOpen,
      checkerName: this.name,
      directReturn: true
    };
  },
  async skip() {
    return !isFirefox();
  }
};

export default firefoxChecker;
