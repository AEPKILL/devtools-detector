import { isEdge, isIE, isFirefox } from '../shared/browser-info';
import { clear, log } from '../shared/console';
import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';

const ele = document.createElement('div');
let isOpen = false;

Object.defineProperty(ele, 'id', {
  get() {
    isOpen = true;
    return elementIdChecker.name;
  },
  configurable: true,
});

export const elementIdChecker: DevtoolsStatusChecker = {
  name: 'element-id',
  async isOpen(): Promise<boolean> {
    isOpen = false;

    log(ele);
    clear();

    return isOpen;
  },
  async isEnable(): Promise<boolean> {
    // IE & Edge & Firefox 不适用
    if (isIE || isEdge || isFirefox) {
      return false;
    }

    return true;
  },
};
