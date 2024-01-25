import { getId } from '../utils/id.utils';

const workerScript = `
onmessage = function(event) {
  var action = event.data;
  var startTime = performance.now()

  console[action.type](...action.payload);
  postMessage({
    id: action.id,
    time: performance.now() - startTime
  })
}
`;

export type WorkerConsoleMethod<Args extends any[]> = (
  ...args: Args
) => Promise<{ time: number }>;

export class WorkerConsole {
  static workerScript = workerScript;

  private readonly worker: Worker;
  private callbacks: Map<number, (data: { time: number }) => void> = new Map();

  readonly log: WorkerConsoleMethod<Parameters<Console['log']>>;
  readonly table: WorkerConsoleMethod<Parameters<Console['table']>>;
  readonly clear: WorkerConsoleMethod<Parameters<Console['clear']>>;

  constructor(worker: Worker) {
    // const workerSrc = URL.createObjectURL(new Blob([workerContent]));
    // this.worker = new Worker(workerSrc);
    // URL.revokeObjectURL(workerSrc);

    this.worker = worker;

    this.worker.onmessage = (event) => {
      const action = event.data;
      const id = action.id;
      const callback = this.callbacks.get(action.id);
      if (callback) {
        callback({
          time: action.time,
        });
        this.callbacks.delete(id);
      }
    };

    this.log = (...args) => {
      return this.send('log', ...args);
    };
    this.table = (...args) => {
      return this.send('table', ...args);
    };
    this.clear = (...args) => {
      return this.send('clear', ...args);
    };
  }

  private async send(type: string, ...messages: any[]) {
    const id = getId();
    return new Promise<{ time: number }>((resolve, reject) => {
      this.callbacks.set(id, resolve);

      this.worker.postMessage({
        id,
        type,
        payload: messages,
      });

      setTimeout(() => {
        reject(new Error('timeout'));
        this.callbacks.delete(id);
      }, 2000);
    });
  }
}
