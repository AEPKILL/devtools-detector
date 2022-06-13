import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isChrome } from '../shared/browser-info';
import { clear, log, table } from '../shared/console';
import { match, now } from '../shared/utils';

const element = document.createElement('div');
const bigObject: HTMLElement[] = [];

for (let i = 0; i < 50; i++) {
  bigObject.push(element);
}

function calcTablePrintTime(): number {
  const start = now();

  table(bigObject);

  return now() - start;
}

function calcLogPrintTime(): number {
  const start = now();

  log(bigObject);

  return now() - start;
}

let maxPrintTime = Math.max(calcLogPrintTime(), 1 / 1000);
clear();
export const performanceChecker: DevtoolsStatusChecker = {
  name: 'performance',
  async isOpen(): Promise<boolean> {
    const tablePrintTime = calcTablePrintTime();
    maxPrintTime = Math.max(maxPrintTime, calcLogPrintTime());

    clear();

    if (tablePrintTime === 0) return false;

    return tablePrintTime > maxPrintTime * 10;
  },
  async isEnable(): Promise<boolean> {
    return match({
      /** 暂时仅用于 Chrome 浏览器 */
      includes: [isChrome],
      excludes: [],
    });
  },
};
