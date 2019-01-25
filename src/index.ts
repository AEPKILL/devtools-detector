import { Detector, Listener } from './detector';
import consoleChecker from './devtools-checker/console-checker';
import debuggerChecker from './devtools-checker/debugger-checker';
import firebugChecker from './devtools-checker/firebug-checker';

const defaultDetector = new Detector({
  checkers: [firebugChecker, consoleChecker, debuggerChecker]
});

export function addListener(listener: Listener) {
  defaultDetector.addListener(listener);
}
export function removeListener(listener: Listener) {
  defaultDetector.removeListener(listener);
}
export function isLanuch() {
  return defaultDetector.isLanuch();
}
export function stop() {
  defaultDetector.stop();
}
export function lanuch() {
  defaultDetector.lanuch();
}

export { DevtoolsChecker } from './devtools-checker/devtools-checker';
export { default as consoleChecker } from './devtools-checker/console-checker';
export {
  default as debuggerChecker
} from './devtools-checker/debugger-checker';
export { Detector, Listener } from './detector';
