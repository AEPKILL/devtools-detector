import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { clear, log } from '../shared/console';

declare global {
  interface Window {
    devtoolsFormatters: unknown[] | undefined;
  }
}

let isOpen = false;
const devtoolsFormatter = {
  header() {
    isOpen = true;
    return null;
  },
};
export const devtoolsFormatterChecker: DevtoolsStatusChecker = {
  name: 'DevtoolsFormatters',
  async isOpen(): Promise<boolean> {
    if (window.devtoolsFormatters) {
      if (window.devtoolsFormatters.indexOf(devtoolsFormatter) === -1) {
        window.devtoolsFormatters.push(devtoolsFormatter);
      }
    } else {
      window.devtoolsFormatters = [devtoolsFormatter];
    }

    isOpen = false;
    log({});
    clear();

    return isOpen;
  },
  async isEnable(): Promise<boolean> {
    return true;
  },
};
