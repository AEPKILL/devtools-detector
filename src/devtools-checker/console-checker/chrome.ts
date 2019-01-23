import { clear, table } from '../../utils/console';
import { DevtoolsChecker } from '../devtools-checker';

const reg = / /;
let isOpen = false;

reg.toString = () => {
  isOpen = true;
  return '';
};

const chromeChecker: DevtoolsChecker = {
  name: 'chrome-checker',
  async getDevtoolsDetail() {
    isOpen = false;
    table({ dep: { reg } });
    clear();
    return {
      isOpen,
      checkerName: this.name
    };
  }
};

export default chromeChecker;
