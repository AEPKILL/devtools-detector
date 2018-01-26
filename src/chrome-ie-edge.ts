import { clear, log } from './console';

// tslint:disable-next-line:no-any
const ele: any = document.createElement('div');
let tempStatus = false;

if (Object.defineProperty) {
  Object.defineProperty(ele, 'className', {
    get() {
      tempStatus = true;
      return 'id';
    },
    configurable: true
  });
} else if (ele.__defineGetter__) {
  ele.__defineGetter__('className', () => {
    tempStatus = true;
    return 'id';
  });
}

export function chromeIeEdgeDevtoolsIsOpen() {
  tempStatus = false;
  log(ele);
  clear();
  return tempStatus;
}

export default {
  chromeIeEdgeDevtoolsIsOpen
};
