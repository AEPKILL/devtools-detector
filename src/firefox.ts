const reg = /  /;
let tempStatus = false;

reg.toString = () => {
  tempStatus = true;
  return '';
};

export function firefoxDevtoolsIsOpen() {
  tempStatus = false;
  console.log(reg);
  console.clear();
  return tempStatus;
}

export default {
  firefoxDevtoolsIsOpen
};
