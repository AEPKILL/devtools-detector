import { DevtoolsChecker } from '../../devtools-checker';
import { log, clear } from '../../../utils/console';

const reg = / /;
let isOpen = false;

reg.toString = () => {
  isOpen = true;
  return regToStringChecker.name;
};

const regToStringChecker: DevtoolsChecker = {
  name: 'reg-toString-checker',
  async getDevtoolsDetail() {
    isOpen = false;
    log(reg);
    clear();
    return {
      isOpen,
      checkerName: this.name
    };
  }
};

export default regToStringChecker;
