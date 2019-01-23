import {
  DevtoolsChecker,
  DevtoolsDetail
} from './devtools-checker/devtools-checker';

export interface DetectorOptions {
  checkers: DevtoolsChecker[];
}
export type Listener = (isOpen: boolean, detail?: DevtoolsDetail) => void;
export class Detector {
  private readonly _checkers: DevtoolsChecker[];
  private _listeners: Listener[] = [];
  private _isOpen = false;
  private _detectLoopStoped = true;
  private _detectLoopDelay = 500;
  private _timer!: number;
  constructor({ checkers }: DetectorOptions) {
    this._checkers = checkers;
  }
  lanuch() {
    if (this._detectLoopDelay <= 0) {
      this.setDetectDelay(500);
    }
    if (this._detectLoopStoped) {
      this._detectLoopStoped = false;
      this._detectLoop();
    }
  }
  stop() {
    this._detectLoopStoped = true;
    clearTimeout(this._timer);
  }
  isLanuch() {
    return !this._detectLoopStoped;
  }
  setDetectDelay(value: number) {
    this._detectLoopDelay = value;
  }
  addListener(listener: Listener) {
    this._listeners.push(listener);
  }
  removeListener(listener: Listener) {
    this._listeners = this._listeners.filter(value => value !== listener);
  }
  emit(value: DevtoolsDetail) {
    for (const listener of this._listeners) {
      try {
        listener(value.isOpen, value);
      } catch {
        /** nothing to do */
      }
    }
  }

  private async _getDevtoolsDetail(): Promise<DevtoolsDetail> {
    for (const checker of this._checkers) {
      const devtoolsDetail = await checker.getDevtoolsDetail();
      if (devtoolsDetail.isOpen) {
        return devtoolsDetail;
      }
    }
    return {
      isOpen: false,
      checkerName: 'all-checkers'
    };
  }
  private async _detectLoop() {
    const detail = await this._getDevtoolsDetail();
    if (detail.isOpen != this._isOpen) {
      this._isOpen = detail.isOpen;
      this.emit(detail);
    }
    if (this._detectLoopDelay > 0) {
      this._timer = setTimeout(() => this._detectLoop(), this._detectLoopDelay);
    } else {
      this.stop();
    }
  }
}
