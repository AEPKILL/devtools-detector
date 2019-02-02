import { isWebkit } from '../../utils/browser';
import { clear, log } from '../../utils/console';
import { DevtoolsChecker } from '../devtools-checker';

function devtoolsTestFunction() {
  // nothing todo
}

let count = 0;

devtoolsTestFunction.toString = () => {
  count++;
};

const webkit2Checker: DevtoolsChecker = {
  name: 'webkit2-checker',
  async getDevtoolsDetail() {
    count = 0;
    log(devtoolsTestFunction);
    clear();
    return {
      isOpen: count === 2,
      checkerName: this.name
    };
  },
  async skip() {
    return !isWebkit();
  }
};

export default webkit2Checker;
