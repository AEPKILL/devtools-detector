import { DevtoolsDetail } from '../types/devtools-detail.type';
import { DevtoolsDetectorListener } from '../types/devtools-detector-listener.type';
import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';

export interface DetectorOptions {
  checkers: DevtoolsStatusChecker[];
}

export class DevtoolsDetector {
  private readonly _checkers: DevtoolsStatusChecker[];
  private _listeners: DevtoolsDetectorListener[] = [];
  private _isOpen = false;
  private _detectLoopStopped = true;
  private _detectLoopDelay = 500;
  private _timer!: number;

  constructor({ checkers }: DetectorOptions) {
    this._checkers = checkers.slice();
  }

  launch() {
    if (this._detectLoopDelay <= 0) {
      this.setDetectDelay(500);
    }
    if (this._detectLoopStopped) {
      this._detectLoopStopped = false;
      this._detectLoop();
    }
  }

  stop() {
    if (!this._detectLoopStopped) {
      this._detectLoopStopped = true;
      clearTimeout(this._timer);
    }
  }

  isLaunch() {
    return !this._detectLoopStopped;
  }

  setDetectDelay(value: number) {
    this._detectLoopDelay = value;
  }

  addListener(listener: DevtoolsDetectorListener) {
    this._listeners.push(listener);
  }

  removeListener(listener: DevtoolsDetectorListener) {
    this._listeners = this._listeners.filter((value) => value !== listener);
  }

  private _broadcast(value: DevtoolsDetail) {
    for (const listener of this._listeners) {
      try {
        listener(value.isOpen, value);
      } catch {
        /** nothing to do */
      }
    }
  }

  private async _detectLoop() {
    let isOpen = false;
    let checkerName = '';

    for (const checker of this._checkers) {
      const isEnable = await checker.isEnable();

      if (isEnable) {
        checkerName = checker.name;
        isOpen = await checker.isOpen();
      }

      // 任意一个 checker 返回 true 就视为 devtools 已打开
      if (isOpen) {
        break;
      }
    }

    if (isOpen != this._isOpen) {
      this._isOpen = isOpen;
      this._broadcast({
        isOpen,
        checkerName,
      });
    }

    if (this._detectLoopDelay > 0) {
      this._timer = setTimeout(() => this._detectLoop(), this._detectLoopDelay);
    } else {
      this.stop();
    }
  }
}
