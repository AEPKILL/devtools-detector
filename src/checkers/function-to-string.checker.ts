import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isFirefox, isWebkit, isChrome } from '../shared/browser-info';
import { clear, log } from '../shared/console';
import { isMobile } from '../shared/platform-info';
import { isIpad, isIphone } from '../shared/system-info';

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

    // ipad & iphone 上的 chrome 始终为 true
    if ((isIpad || isIphone) && isChrome) {
      return false;
    }

    return true;
  },
};
