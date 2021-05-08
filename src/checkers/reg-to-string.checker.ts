import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { clear, log } from '../shared/console';
import { isWebkit } from '../shared/browser-info';

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
    if (isWebkit) {
      return false;
    }

    return true;
  },
};
