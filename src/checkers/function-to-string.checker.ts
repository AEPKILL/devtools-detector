import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isFirefox, isChrome } from '../shared/browser-info';
import { clear, log } from '../shared/console';
import { isIpad, isIphone } from '../shared/system-info';
import { match } from '../shared/utils';

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
    return match({
      /** 匹配所有浏览器 */
      includes: [true],
      /** 排除 firefox 和  ipad 或 iphone 上的 chrome */
      excludes: [
        isFirefox,
        // ipad 或 iphone 上的 chrome
        (isIpad || isIphone) && isChrome,
      ],
    });
  },
};
