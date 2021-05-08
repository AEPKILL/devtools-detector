import { DevtoolsDetector } from './classes/devtools-detector';
import { debuggerChecker } from './checkers/debugger.checker';
import { depRegToStringChecker } from './checkers/dep-reg-to-string.checker';
import { elementIdChecker } from './checkers/element-id.checker';
import { functionToStringChecker } from './checkers/function-to-string.checker';
import { regToStringChecker } from './checkers/reg-to-string.checker';
import { DevtoolsDetectorListener } from './types/devtools-detector-listener.type';

const defaultDetector = new DevtoolsDetector({
  // 会按照 checker 的顺序执行检查
  checkers: [
    elementIdChecker,
    regToStringChecker,
    functionToStringChecker,
    depRegToStringChecker,
    debuggerChecker,
  ],
});

export function addListener(listener: DevtoolsDetectorListener) {
  defaultDetector.addListener(listener);
}

export function removeListener(listener: DevtoolsDetectorListener) {
  defaultDetector.removeListener(listener);
}

export function isLaunch() {
  return defaultDetector.isLaunch();
}

export function launch() {
  defaultDetector.launch();
}

export function stop() {
  defaultDetector.stop();
}

export function setDetectDelay(time: number) {
  defaultDetector.setDetectDelay(time);
}

export default defaultDetector;

export { DevtoolsDetail } from './types/devtools-detail.type';
export { DevtoolsDetectorListener } from './types/devtools-detector-listener.type';
export { DevtoolsStatusChecker } from './types/devtools-status-checker.type';
