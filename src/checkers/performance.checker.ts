import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isChrome } from '../shared/browser-info';
import { clear, log, table } from '../shared/console';
import { match, now } from '../shared/utils';

let largeObjectArray: Record<string, string>[] | null = null;
let maxPrintTime = 0;
export const performanceChecker: DevtoolsStatusChecker = {
  name: 'performance',
  async isOpen(): Promise<boolean> {
    if (largeObjectArray === null) {
      largeObjectArray = createLargeObjectArray();
    }

    const tablePrintTime = calcTablePrintTime();
    const logPrintTime = calcLogPrintTime();
    maxPrintTime = Math.max(maxPrintTime, logPrintTime);

    clear();

    if (tablePrintTime === 0) return false;
    if (maxPrintTime === 0) return false;

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

function createLargeObjectArray(): Record<string, string>[] {
  const largeObject = createLargeObject();
  const largeObjectArray: Record<string, string>[] = [];

  for (let i = 0; i < 50; i++) {
    largeObjectArray.push(largeObject);
  }

  return largeObjectArray;
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
