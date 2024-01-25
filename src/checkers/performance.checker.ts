import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isChrome } from '../shared/context';
import { clear, log, table } from '../shared/console';
import { match } from '../utils/match.utils';
import { now } from '../utils/time.utils';
import { getWorkerConsole } from '../utils/platform.utils';

let largeObjectArray: Record<string, string>[] | null = null;
let maxPrintTime = 0;
export const performanceChecker: DevtoolsStatusChecker = {
  name: 'performance',
  async isOpen(): Promise<boolean> {
    if (largeObjectArray === null) {
      largeObjectArray = createLargeObjectArray();
    }

    const tablePrintTime = await calcTablePrintTime();
    const logPrintTime = await calcLogPrintTime();
    maxPrintTime = Math.max(maxPrintTime, logPrintTime);

    const workerConsole = getWorkerConsole();

    if (workerConsole) {
      await workerConsole.clear();
    } else {
      clear();
    }

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

async function calcTablePrintTime(): Promise<number> {
  const workerConsole = getWorkerConsole();

  if (workerConsole) {
    const { time } = await workerConsole.table(largeObjectArray);
    return time;
  }

  const start = now();

  table(largeObjectArray);

  return now() - start;
}

async function calcLogPrintTime(): Promise<number> {
  const workerConsole = getWorkerConsole();
  if (workerConsole) {
    const { time } = await workerConsole.log(largeObjectArray);
    return time;
  }

  const start = now();

  log(largeObjectArray);

  return now() - start;
}
