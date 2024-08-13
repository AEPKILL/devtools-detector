import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isFirefox, isChrome, isIqiyiApp, isEdge } from '../shared/context';
import { clear, log } from '../shared/console';
import { isIpad, isIphone } from '../shared/system-info';
import { match } from '../utils/match.utils';

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
    const iOS = isIpad || isIphone;

    return match({
      /** 匹配所有浏览器 */
      includes: [true],
      /** 排除 firefox 和  ipad 或 iphone 上的 chrome */
      excludes: [
        isIqiyiApp,
        isFirefox,
        // ipad 或 iphone 上的 chrome
        iOS && isChrome,
        iOS && isEdge,
      ],
    });
  },
};
