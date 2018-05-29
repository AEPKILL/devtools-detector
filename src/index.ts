import { isFirefox } from './browser';
import { chromeCanaryDevtoolsIsOpen } from './chrome-canary';
import { chromeIeEdgeDevtoolsIsOpen } from './chrome-ie-edge';
import { devtoolsIsDocked } from './docked';
import { firebugIsOpen } from './firebug';
import { firefoxDevtoolsIsOpen } from './firefox';
import { emitDevtoolsStatusChange } from './listeners';

let devtoolsStatus = false;
let detectLoopStoped = true;
let detectDelay = 500;
let timer: number;

function devtoolsIsOpen() {
  if (devtoolsIsDocked()) {
    return true;
  }
  if (firebugIsOpen()) {
    return true;
  }
  if (isFirefox) {
    return firefoxDevtoolsIsOpen();
  }
  if (chromeIeEdgeDevtoolsIsOpen()) {
    return true;
  }
  if (chromeCanaryDevtoolsIsOpen()) {
    return true;
  }
  return false;
}

function detectLoop() {
  const devtoolsCurrentStatus = devtoolsIsOpen();
  if (devtoolsStatus != devtoolsCurrentStatus) {
    emitDevtoolsStatusChange((devtoolsStatus = devtoolsCurrentStatus));
  }
  if (detectDelay > 0) {
    timer = setTimeout(detectLoop, detectDelay);
  } else {
    stop();
  }
}

export { Listener, addListener, removeListener } from './listeners';

export function setDetectDelay(value: number) {
  detectDelay = value;
}

export function launch() {
  if (detectDelay <= 0) {
    setDetectDelay(500);
  }
  if (detectLoopStoped) {
    detectLoopStoped = false;
    detectLoop();
  }
}

export function stop() {
  detectLoopStoped = true;
  clearTimeout(timer);
}

export function isLaunch() {
  return !detectLoopStoped;
}
