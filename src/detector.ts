import checkerGroup from './devtools-checker/checker-group';
import {
  DevtoolsChecker,
  DevtoolsDetail,
} from './devtools-checker/devtools-checker';

export interface DetectorOptions {
  checkers: DevtoolsChecker[];
}
export type Listener = (isOpen: boolean, detail?: DevtoolsDetail) => void;

export class Detector {
  private readonly _checker: DevtoolsChecker;
  private _listeners: Listener[] = [];
  private _isOpen = false;
  private _detectLoopStopped = true;
  private _detectLoopDelay = 500;
  private _timer!: number;
  constructor({ checkers }: DetectorOptions) {
    this._checker = checkerGroup(checkers);
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
  addListener(listener: Listener) {
    this._listeners.push(listener);
  }
  removeListener(listener: Listener) {
    this._listeners = this._listeners.filter((value) => value !== listener);
  }

  // 下面两个方法拼写错误，但是为了兼容依然保留
  lanuch() {
    this.launch();
  }
  isLanuch() {
    return this.isLaunch();
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
    const detail = await this._checker.getDevtoolsDetail();
    if (detail.isOpen != this._isOpen) {
      this._isOpen = detail.isOpen;
      this._broadcast(detail);
    }
    if (this._detectLoopDelay > 0) {
      this._timer = setTimeout(() => this._detectLoop(), this._detectLoopDelay);
    } else {
      this.stop();
    }
  }
}
