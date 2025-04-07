import { now } from '../utils/time.utils';
import type { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';

export const debuggerChecker: DevtoolsStatusChecker = {
  name: 'debugger-checker',
  async isOpen(): Promise<boolean> {
    const startTime = now();

    try {
      (() => {}).constructor('debugger')();
    } catch {
      // biome-ignore lint/suspicious/noDebugger: <explanation>
      debugger;
    }

    return now() - startTime > 100;
  },
  async isEnable(): Promise<boolean> {
    return true;
  },
};
