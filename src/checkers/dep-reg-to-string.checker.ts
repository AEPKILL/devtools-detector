import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isEdge, isFirefox, isIE } from '../shared/browser-info';
import { table, clear } from '../shared/console';

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
    if (isFirefox || isIE) {
      return false;
    }

    return true;
  },
};
