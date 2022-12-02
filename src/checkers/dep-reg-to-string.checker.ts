import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isEdge, isFirefox, isIE } from '../shared/context';
import { table, clear } from '../shared/console';
import { match } from '../shared/utils';

const reg = / /;
let isOpen = false;

reg.toString = () => {
  isOpen = true;
  return depRegToStringChecker.name;
};

export const depRegToStringChecker: DevtoolsStatusChecker = {
  name: 'dep-reg-to-string',
  async isOpen(): Promise<boolean> {
    isOpen = false;

    table({ dep: reg });
    clear();

    return isOpen;
  },
  async isEnable(): Promise<boolean> {
    return match({
      /** 匹配所有浏览器 */
      includes: [true],
      /** 排除 firefox 和 ie */
      excludes: [isFirefox, isIE],
    });
  },
};
