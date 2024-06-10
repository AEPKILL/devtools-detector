import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';
import { isChrome } from '../shared/context';
import { match } from '../utils/match.utils';
import { getWorkerConsole, isBrave } from '../utils/platform.utils';
import { WorkerConsole } from '../classes/worker-console';
import { getLargeObjectArray } from '../utils/large-object.utils';

let maxPrintTime = 0;
export const workerPerformanceChecker: DevtoolsStatusChecker = {
  name: 'worker-performance',
  async isOpen(): Promise<boolean> {
    const workerConsole = getWorkerConsole();

    if (workerConsole == null) return false;

    const tablePrintTime = await calcTablePrintTime(workerConsole);
    const logPrintTime = await calcLogPrintTime(workerConsole);
    maxPrintTime = Math.max(maxPrintTime, logPrintTime);

    await workerConsole.clear();

    if (tablePrintTime === 0) return false;
    if (maxPrintTime === 0) {
      if (await isBrave()) {
        return true;
      }
      return false;
    }

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

async function calcTablePrintTime(
  workerConsole: WorkerConsole
): Promise<number> {
  const largeObjectArray = getLargeObjectArray();
  const { time } = await workerConsole.table(largeObjectArray);
  return time;
}

async function calcLogPrintTime(workerConsole: WorkerConsole): Promise<number> {
  const largeObjectArray = getLargeObjectArray();
  const { time } = await workerConsole.log(largeObjectArray);
  return time;
}
