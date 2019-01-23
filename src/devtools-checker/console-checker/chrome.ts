import { clear, table } from '../../utils/console';
import { DevtoolsChecker } from '../devtools-checker';

const reg = / /;
let tempStatus = false;

reg.toString = () => {
  tempStatus = true;
  return '';
};

const chromeCanaryChecker: DevtoolsChecker = {
  name: 'chrome-checker',
  async getDevtoolsDetail() {
    tempStatus = false;
    table({ dep: { reg } });
    clear();
    return {
      isOpen: tempStatus,
      checkerName: this.name
    };
  }
};

export default chromeCanaryChecker;
