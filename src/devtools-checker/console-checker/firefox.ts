import { clear, log } from '../../utils/console';
import { DevtoolsChecker } from '../devtools-checker';

const reg = / /;
let tempStatus = false;

reg.toString = () => {
  tempStatus = true;
  return '';
};

const firefoxChecker: DevtoolsChecker = {
  name: 'firefox-checker',
  async getDevtoolsDetail() {
    tempStatus = false;
    log(reg);
    clear();
    return {
      isOpen: tempStatus,
      checkerName: this.name
    };
  }
};

export default firefoxChecker;
