import { clear, log } from '../../../utils/console';
import { DevtoolsChecker } from '../../devtools-checker';

function devtoolsTestFunction() {
  // nothing todo
}

let count = 0;

devtoolsTestFunction.toString = () => {
  count++;
};

const functionToStringChecker: DevtoolsChecker = {
  name: 'function-to-string-checker',
  async getDevtoolsDetail() {
    count = 0;
    log(devtoolsTestFunction);
    clear();
    return {
      isOpen: count === 2,
      checkerName: this.name
    };
  }
};

export default functionToStringChecker;
