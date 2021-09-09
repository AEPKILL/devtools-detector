import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isChrome } from '../shared/browser-info';
import { clear, log } from '../shared/console';
import { match } from '../shared/utils';

var date = new Date();

let count = 0;

date.toString = () => {
  count++;

  return '';
};

// see https://github.com/ChromeDevTools/devtools-frontend/front_end/core/sdk/RemoteObject.ts
export const dateToStringChecker: DevtoolsStatusChecker = {
  name: 'date-to-string',
  async isOpen(): Promise<boolean> {
    count = 0;

    log(date);
    clear();

    return count === 2;
  },
  async isEnable(): Promise<boolean> {
    return match({
      /** 仅针对 chrome 其他待测试 */
      includes: [isChrome],
      /** 排除 firefox 和  ipad 或 iphone 上的 chrome */
      excludes: [
        // isFirefox,
        // ipad 或 iphone 上的 chrome
        // (isIpad || isIphone) && isChrome,
      ],
    });
  },
};
