import type { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { clear, log } from '../shared/console';
import { isWebkit } from '../shared/context';
import { match } from '../utils/match.utils';

const reg = / /;
let isOpen = false;

reg.toString = () => {
  isOpen = true;
  return regToStringChecker.name;
};

export const regToStringChecker: DevtoolsStatusChecker = {
  name: 'reg-to-string',
  async isOpen(): Promise<boolean> {
    isOpen = false;

    log(reg);
    clear();

    return isOpen;
  },
  async isEnable(): Promise<boolean> {
    return match({
      /** 匹配所有浏览器 */
      includes: [true],
      /** 排除 webkit */
      excludes: [isWebkit],
    });
  },
};
