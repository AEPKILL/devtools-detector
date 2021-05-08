import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isFirefox, isWebkit } from '../shared/browser-info';
import { clear, log } from '../shared/console';
import { isMobile } from '../shared/platform-info';

function devtoolsTestFunction() {
  // nothing todo
}

let count = 0;

devtoolsTestFunction.toString = () => {
  count++;

  return '';
};

export const functionToStringChecker: DevtoolsStatusChecker = {
  name: 'function-to-string',
  async isOpen(): Promise<boolean> {
    count = 0;

    log(devtoolsTestFunction);
    clear();

    return count === 2;
  },
  async isEnable(): Promise<boolean> {
    if (isFirefox) {
      return false;
    }

    // 不支持移动端 Webkit
    if (isWebkit && isMobile) {
      return false;
    }

    return true;
  },
};
