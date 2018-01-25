const reg = /  /;
let tempStatus = false;

reg.toString = () => {
  tempStatus = true;
  return '';
};

export function chromeCanaryDevtoolsIsOpen() {
  tempStatus = false;
  console.table({ dep: { reg } });
  console.clear();
  return tempStatus;
}

export default {
  chromeCanaryDevtoolsIsOpen
};
