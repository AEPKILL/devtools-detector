import { now } from '../utils/time.utils';
import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';

export const debuggerChecker: DevtoolsStatusChecker = {
  name: 'debugger-checker',
  async isOpen(): Promise<boolean> {
    const startTime = now();

    try {
      // tslint:disable-next-line:no-empty only-arrow-functions
      (function () {}).constructor('debugger')();
    } catch {
      debugger;
    }

    return now() - startTime > 100;
  },
  async isEnable(): Promise<boolean> {
    return true;
  },
};
