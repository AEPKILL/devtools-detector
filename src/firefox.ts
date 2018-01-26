import { clear, log } from './console';

const reg = /  /;
let tempStatus = false;

reg.toString = () => {
  tempStatus = true;
  return '';
};

export function firefoxDevtoolsIsOpen() {
  tempStatus = false;
  log(reg);
  clear();
  return tempStatus;
}

export default {
  firefoxDevtoolsIsOpen
};
