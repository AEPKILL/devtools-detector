import { DevtoolsChecker } from '../../devtools-checker';
import { log, clear, table } from '../../../utils/console';

const reg = / /;
let isOpen = false;

reg.toString = () => {
  isOpen = true;
  return depRegToStringChecker.name;
};

const depRegToStringChecker: DevtoolsChecker = {
  name: 'dep-reg-toString-checker',
  async getDevtoolsDetail() {
    isOpen = false;
    table({ dep: reg });
    clear();
    return {
      isOpen,
      checkerName: this.name
    };
  }
};

export default depRegToStringChecker;
