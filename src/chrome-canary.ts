import { table } from './console';

const reg = /  /;
let tempStatus = false;

reg.toString = () => {
  tempStatus = true;
  return '';
};

export function chromeCanaryDevtoolsIsOpen() {
  tempStatus = false;
  table({ dep: { reg } });
  return tempStatus;
}

export default {
  chromeCanaryDevtoolsIsOpen
};
