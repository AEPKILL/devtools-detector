import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isChrome } from '../shared/browser-info';
import { clear, log, table } from '../shared/console';
import { match, now } from '../shared/utils';

const largeObject = createLargeObject();
const largeObjectArray: Record<string, string>[] = [];

for (let i = 0; i < 50; i++) {
  largeObjectArray.push(largeObject);
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

function createLargeObject(): Record<string, string> {
  const largeObject: Record<string, string> = {};
  for (let i = 0; i < 500; i++) {
    largeObject[`${i}`] = `${i}`;
  }
  return largeObject;
}

function calcTablePrintTime(): number {
  const start = now();

  table(largeObjectArray);

  return now() - start;
}

function calcLogPrintTime(): number {
  const start = now();

  log(largeObjectArray);

  return now() - start;
}
