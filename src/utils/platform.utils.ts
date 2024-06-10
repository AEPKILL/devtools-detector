import { WorkerConsole } from '../classes/worker-console';

declare const global: any;
export function getGlobalThis(this: any): typeof globalThis {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if ((typeof global as any) !== 'undefined') {
    return global;
  }
  return this;
}

export function createElement(
  ...args: Parameters<(typeof document)['createElement']>
): ReturnType<(typeof document)['createElement']> {
  const globalThis = getGlobalThis();

  if (globalThis?.document) {
    return globalThis.document.createElement(...args);
  }

  return {} as any;
}

let workerConsole: WorkerConsole;
let supportWorkerConsole = true;
export function getWorkerConsole() {
  if (workerConsole) return workerConsole;
  if (!supportWorkerConsole) return;

  const workerBlob = new Blob([WorkerConsole.workerScript]);

  try {
    const workerSrc = URL.createObjectURL(workerBlob);
    workerConsole = new WorkerConsole(new Worker(workerSrc));
    URL.revokeObjectURL(workerSrc);
  } catch {
    try {
      workerConsole = new WorkerConsole(
        new Worker(`data:text/javascript;base64,${btoa(WorkerConsole.workerScript)}`)
      );
    } catch {
      supportWorkerConsole = false;
    }
  }

  return workerConsole;
}



declare global {
  interface Navigator {
    brave: any;
  }
}
export let isBrave = async function (): Promise<boolean> {
  let _isBrave = false;

  if (navigator.brave) {
    if (navigator.brave.isBrave) {
      try {
        _isBrave = await Promise.race([navigator.brave.isBrave(), new Promise(resolve => setTimeout(() => resolve(false), 1000))]);
      } catch (e) {
      }
    }
  }

  isBrave = async function () {
    return _isBrave;
  }

  return _isBrave;
}
