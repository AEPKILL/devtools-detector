import { clear, log } from './console';

const ele = document.createElement('div');
let tempStatus = false;

Object.defineProperty(ele, 'id', {
  get() {
    tempStatus = true;
    return '';
  },
  configurable: true
});

export function chromeIeEdgeDevtoolsIsOpen() {
  tempStatus = false;
  log(ele);
  clear();
  return tempStatus;
}

export default {
  chromeIeEdgeDevtoolsIsOpen
};
