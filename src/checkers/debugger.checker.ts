import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';

function now() {
  if (performance) {
    return performance.now();
  } else {
    return Date.now();
  }
}

export const debuggerChecker: DevtoolsStatusChecker = {
  name: 'debugger-checker',
  async isOpen(): Promise<boolean> {
    const startTime = now();

    // tslint:disable-next-line:no-empty only-arrow-functions
    (function () {}.constructor('debugger')());

    return now() - startTime > 100;
  },
  async isEnable(): Promise<boolean> {
    return true;
  },
};
