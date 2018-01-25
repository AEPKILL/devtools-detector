import { chromeCanaryDevtoolsIsOpen } from './chrome-canary';
import { chromeIeEdgeDevtoolsIsOpen } from './chrome-ie-edge';
import { devtoolsIsDocked } from './docked';
import { firebugIsOpen, hasFirebug } from './firebug';
import { firefoxDevtoolsIsOpen } from './firefox';
import { emitDevtoolsStatusChange } from './listeners';

const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
let devtoolsCurrentStatus = false;
let wasLaunch = false;
let detectDelay = 500;
let detectLoopStoped = false;

function detectLoop() {
  let devtoolsIsOpen = false;
  if (devtoolsIsDocked()) {
    devtoolsIsOpen = true;
  } else if (hasFirebug()) {
    devtoolsIsOpen = firebugIsOpen();
  } else if (isFirefox) {
    devtoolsIsOpen = firefoxDevtoolsIsOpen();
  } else {
    devtoolsIsOpen = chromeIeEdgeDevtoolsIsOpen();
    if (!devtoolsIsOpen) {
      devtoolsIsOpen = chromeCanaryDevtoolsIsOpen();
    }
  }
  if (devtoolsCurrentStatus != devtoolsIsOpen) {
    emitDevtoolsStatusChange((devtoolsCurrentStatus = devtoolsIsOpen));
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
    detectLoop();
  }
}

export function launch() {
  if (wasLaunch) {
    return;
  }
  wasLaunch = true;
  detectLoop();
}
