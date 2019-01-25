import { isFirefox } from '../../utils/browser';
import { clear, log } from '../../utils/console';
import { DevtoolsChecker } from '../devtools-checker';

const reg = / /;
let isOpen = false;

reg.toString = () => {
  isOpen = true;
  return firefoxChecker.name;
};

const firefoxChecker: DevtoolsChecker = {
  name: 'firefox-checker',
  async getDevtoolsDetail() {
    isOpen = false;
    log(reg);
    clear();
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
