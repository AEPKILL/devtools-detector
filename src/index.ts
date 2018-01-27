import { chromeCanaryDevtoolsIsOpen } from './chrome-canary';
import { chromeIeEdgeDevtoolsIsOpen } from './chrome-ie-edge';
import { patch } from './console';
import { devtoolsIsDocked } from './docked';
import { firebugIsOpen } from './firebug';
import { firefoxDevtoolsIsOpen } from './firefox';
import { emitDevtoolsStatusChange } from './listeners';

const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
let devtoolsStatus = false;
let detectLoopStoped = true;
let detectDelay = 500;

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
}

function detectLoop() {
  const devtoolsCurrentStatus = devtoolsIsOpen();
  if (devtoolsStatus != devtoolsCurrentStatus) {
    emitDevtoolsStatusChange((devtoolsStatus = devtoolsCurrentStatus));
  }
  if (detectDelay > 0) {
    setTimeout(detectLoop, detectDelay);
  } else {
    detectLoopStoped = true;
  }
}

export { Listener, addListener, removeListener } from './listeners';

export function setDetectDelay(value: number) {
  detectDelay = value;
  if (detectDelay > 0 && detectLoopStoped) {
    detectLoopStoped = false;
    detectLoop();
  }
}

export function launch() {
  setDetectDelay(500);
}

patch();
